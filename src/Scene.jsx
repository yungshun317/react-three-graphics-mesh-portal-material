import {MeshPortalMaterial, RoundedBox, useGLTF, useTexture} from "@react-three/drei";
import {useRef, useState} from "react";
import * as THREE from "three";

const Scene = () => {
    const [active, setActive] = useState(false);
    const meshPortalMaterialRef = useRef();

    const model = useGLTF("./static/models/1.glb");
    const texture = useTexture("./static/textures/1.png");

    const doubleClickHandler = () => {
        setActive(!active);
    };

    return (
        <>
            <RoundedBox
                args={[3, 4, 0.1]}
                radius={0.1}
                onDoubleClick={doubleClickHandler}
            >
                <MeshPortalMaterial ref={meshPortalMaterialRef}>
                    <primitive object={model.scene} scale={0.6} position-y={0.6} />

                    <mesh>
                        { /* args = (radius, widthSegments, heightSegments) */ }
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshBasicMaterial map={texture} side={THREE.BackSide} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </>
    );
};

export default Scene;