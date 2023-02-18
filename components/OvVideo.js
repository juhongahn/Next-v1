import { useEffect, useRef, useState } from "react";

export default function OpenViduVideoComponent(props) {
    const URL = "./my_model/";

    const videoRef = useRef(null);
    const poseStatus = useRef("stand");

    let model, ctx, labelContainer, maxPredictions;

    const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmPose.load(modelURL, metadataURL);   //CustomPoseNet 객체 반환.
        maxPredictions = model.getTotalClasses();

        window.requestAnimationFrame(loop);
    }

    const loop = async () => {
        await predict();
        window.requestAnimationFrame(loop);
    }

    const predict = async () => {
        // const { pose, posenetOutput } = await model.estimatePose(videoRef.current);
        const { pose, posenetOutput } = await model.estimatePose(videoRef.current);
        const prediction = await model.predict(posenetOutput);

        if (prediction[0].probability.toFixed(2) >= 0.85) {
            if (poseStatus === "squat") {
                console.log("squat!");
            }
            poseStatus.current = "stand";
            console.log("stand!");

        } else if (prediction[1].probability.toFixed(2) >= 0.75) {
            poseStatus.current = "squat";
            console.log("squat!");

        }
    }

    useEffect(() => {
        if (props && !!videoRef.current) {
            props.streamManager.addVideoElement(videoRef.current);
        }

    }, [props]);
    useEffect(() => {
        init();
    })

    return <video autoPlay={true} ref={videoRef} />;
}