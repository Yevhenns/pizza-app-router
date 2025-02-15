import Confetti from 'react-confetti';

export function ConfettiComponent() {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const { width, height } = getWindowDimensions();
  return (
    <Confetti
      width={width}
      height={height}
      gravity={0.2}
      numberOfPieces={300}
      recycle={false}
    />
  );
}
