export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },    
    {
        name: 'peopleModel',
        type: 'gltfModel',
        path: 'models/People/scene.gltf'
    },
    {
        name: 'limeModel',
        type: 'gltfModel',
        path: 'models/Lime/food_lime_01_2k.gltf'
    },
    {
        name: 'waterVertexShader',
        type: 'shader',
        path: 'shaders/water/vertex.glsl'
    },
    {
        name: 'waterFragmentShader',
        type: 'shader',
        path: 'shaders/water/fragment.glsl'
    }
]