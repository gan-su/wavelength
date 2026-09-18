"""
Serfis opening: render 3D petal sprites for the landing page.

Run locally (Blender is not available in the Claude session this was written in,
so this script has NOT been executed - expect to tweak the look on first run):

    blender --background --python blender/petals.py

Writes RGBA PNGs to blender/out/. Each petal is rendered at several angles so the
page can flip between them as a petal turns over, instead of faking depth by
squashing a flat sprite.

Palette is the Serfis four:
    Midnight Purple  #0F032D
    Purple Heart     #4E2BCC
    Lavender Indigo  #905BF4
    Seashell         #EFEFEF
"""

import bpy, bmesh, math, os
from mathutils import Vector

OUT       = os.path.join(os.path.dirname(bpy.data.filepath or __file__), "out")
ANGLES    = 8          # turn steps per variant; the page cycles these
RES       = 512        # square output
SEGMENTS  = 24         # mesh resolution across and along the petal

# tip colour, base colour  (linear-ish sRGB, Blender wants 0-1 floats)
VARIANTS = [
    ((0.659, 0.486, 1.000), (0.306, 0.169, 0.800)),   # lavender -> purple heart
    ((0.565, 0.357, 0.957), (0.173, 0.075, 0.439)),   # lavender indigo -> deep
    ((0.780, 0.706, 0.984), (0.439, 0.251, 0.878)),   # pale -> violet
    ((0.937, 0.918, 1.000), (0.565, 0.357, 0.957)),   # seashell -> lavender
]


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in (bpy.data.meshes, bpy.data.materials, bpy.data.lights):
        for item in list(block):
            block.remove(item)


def build_petal(name="Petal", length=1.0, width=0.62, curl=0.34, cup=0.55):
    """A petal as a deformed grid.

    v runs base(0) -> tip(1). The width profile is a sine raised to a power, so the
    petal is widest around a third of the way up and comes to a soft point, which is
    what separates a petal silhouette from a leaf. curl bends it along its length,
    cup curves it across - together they catch the light along one edge the way a
    real petal does, and that is what sells it once it is rotating.
    """
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)

    bm = bmesh.new()
    grid = {}
    for iv in range(SEGMENTS + 1):
        v = iv / SEGMENTS
        profile = math.sin(math.pi * min(v, 0.999) ** 0.86) ** 0.72
        for iu in range(SEGMENTS + 1):
            u = iu / SEGMENTS
            x = (u - 0.5) * width * profile
            y = v * length
            z = curl * math.sin(math.pi * v) * 0.5 + cup * (x * x)
            grid[(iu, iv)] = bm.verts.new((x, y, z))
    bm.verts.ensure_lookup_table()

    for iv in range(SEGMENTS):
        for iu in range(SEGMENTS):
            try:
                bm.faces.new((grid[(iu, iv)], grid[(iu + 1, iv)],
                              grid[(iu + 1, iv + 1)], grid[(iu, iv + 1)]))
            except ValueError:
                pass            # degenerate quad at the tip where the profile closes
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()

    obj.modifiers.new("Subdiv", "SUBSURF").levels = 2
    sol = obj.modifiers.new("Solidify", "SOLIDIFY")
    sol.thickness = 0.006      # real thickness so the edge catches a highlight
    for poly in mesh.polygons:
        poly.use_smooth = True
    return obj


def make_material(tip_rgb, base_rgb):
    mat = bpy.data.materials.new("PetalMat")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()

    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    geo = nt.nodes.new("ShaderNodeNewGeometry")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")

    ramp.color_ramp.elements[0].color = (*base_rgb, 1)
    ramp.color_ramp.elements[1].color = (*tip_rgb, 1)

    bsdf.inputs["Roughness"].default_value = 0.42
    if "Subsurface Weight" in bsdf.inputs:            # Blender 4.x naming
        bsdf.inputs["Subsurface Weight"].default_value = 0.22
    if "Transmission Weight" in bsdf.inputs:
        bsdf.inputs["Transmission Weight"].default_value = 0.10

    nt.links.new(geo.outputs["Position"], sep.inputs["Vector"])
    nt.links.new(sep.outputs["Y"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat


def setup_render():
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 96
    scene.render.film_transparent = True            # alpha, so petals composite on any ground
    scene.render.resolution_x = scene.render.resolution_y = RES
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"

    cam_data = bpy.data.cameras.new("Cam")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = 1.45
    cam = bpy.data.objects.new("Cam", cam_data)
    cam.location = (0, 0.5, 3.2)
    cam.rotation_euler = (0, 0, 0)
    bpy.context.collection.objects.link(cam)
    scene.camera = cam

    key = bpy.data.lights.new("Key", "AREA"); key.energy = 320; key.size = 4
    key_obj = bpy.data.objects.new("Key", key)
    key_obj.location = (2.4, -1.4, 3.0)
    key_obj.rotation_euler = (math.radians(38), 0, math.radians(34))
    bpy.context.collection.objects.link(key_obj)

    rim = bpy.data.lights.new("Rim", "AREA"); rim.energy = 140; rim.size = 3
    rim_obj = bpy.data.objects.new("Rim", rim)
    rim_obj.location = (-2.2, 1.6, 1.6)
    rim_obj.rotation_euler = (math.radians(-28), 0, math.radians(-40))
    bpy.context.collection.objects.link(rim_obj)


def main():
    clear_scene()
    setup_render()
    os.makedirs(OUT, exist_ok=True)

    for vi, (tip, base) in enumerate(VARIANTS):
        petal = build_petal(f"Petal{vi}")
        petal.data.materials.append(make_material(tip, base))
        for a in range(ANGLES):
            # rotate about the long axis: this is the turn the page reads as flutter
            petal.rotation_euler = (math.radians(-14), math.radians(a * 180.0 / ANGLES), 0)
            bpy.context.scene.render.filepath = os.path.join(OUT, f"petal_{vi}_{a:02d}.png")
            bpy.ops.render.render(write_still=True)
        bpy.data.objects.remove(petal, do_unlink=True)

    print(f"\nDone. {len(VARIANTS) * ANGLES} petal frames in {OUT}")
    print("Send me the folder and I will swap them in for the canvas-drawn sprites.")


if __name__ == "__main__":
    main()
