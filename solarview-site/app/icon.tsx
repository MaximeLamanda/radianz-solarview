import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EFF9BA",
          borderRadius: 7,
        }}
      >
        <svg width="20" height="15" viewBox="0 0 87 64" fill="none">
          <path
            d="M26 47C26 44.2386 28.2386 42 31 42H33C35.7614 42 38 44.2386 38 47V64H26V47Z"
            fill="#0A0A0A"
          />
          <path
            d="M38 17C38 19.7614 35.7614 22 33 22L31 22C28.2386 22 26 19.7614 26 17L26 0L38 0L38 17Z"
            fill="#0A0A0A"
          />
          <path
            d="M17 27C19.7614 27 22 29.2386 22 32L22 34C22 36.7614 19.7614 39 17 39L0 39L0 27L17 27Z"
            fill="#0A0A0A"
          />
          <path
            d="M68 32H73.9731C77.074 32 78.9956 28.6242 77.4125 25.9578L62 0H50L68 32Z"
            fill="#0A0A0A"
          />
          <path
            d="M74 64H87L68 32H64.5492C60.7251 32 58.3165 36.1183 60.1914 39.4513L74 64Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
