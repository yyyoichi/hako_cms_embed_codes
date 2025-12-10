import React from "react"


/**
 * @example
 *  <SurveyIfram src="https://hako-views.yyyoichi.com/surveys/xxxxxx/questions/xxxxxx"/>
 */
export function SurveyIframe(props: React.ComponentProps<"iframe">) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState<null | number>(null);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: check origin
      if (event.origin !== "https://hako-views.yyyoichi.com") return;

      if (event.data.type === "survey-resize" && typeof event.data.height === "number") {
        setHeight(event.data.height);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Question Preview"
      style={{
        display: "block",
        border: "none",
        height: `${height || 0}px`,
        width: "100%",
        transition: "height 0.3s ease",
        opacity: height === null ? 0 : 1,
      }}
      sandbox="allow-scripts allow-same-origin"
      {...props}
    />
  );
}
