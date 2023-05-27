const ImagePreview = () => {
  return (
    <div
      style={{
        height: "200px",
        flex: 1,
        width: "100%",
        aspectRatio: 16 / 9,
        display: "grid",
        placeContent: "center",
      }}
    >
      <div
        className="img-cropped"
        style={{
          height: "200px",
          width: "100%",
          overflow: "hidden",
          aspectRatio: 16 / 9,
        }}
      ></div>
    </div>
  );
};

export default ImagePreview;
