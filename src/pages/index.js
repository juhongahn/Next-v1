import Game from "components/Game";

export default function Home() {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8.3/dist/teachablemachine-pose.min.js"></script>
      <Game />
    </>
  )
}
