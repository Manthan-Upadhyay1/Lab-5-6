import { useCallback, useState } from "react";

/**
 * Wraps navigator.geolocation (the "Use my current location" button).
 * status: idle | loading | success | error | unsupported
 */
export function useGeolocation(onSuccess) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      setMessage("Geolocation is not supported by your browser.");
      return;
    }
    setStatus("loading");
    setMessage("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setStatus("success");
        setMessage(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
        onSuccess?.({ latitude: coords.latitude, longitude: coords.longitude });
      },
      () => {
        setStatus("error");
        setMessage("Please allow location access.");
      },
    );
  }, [onSuccess]);

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  return { status, message, locate, reset };
}
