import { useEffect, useState } from "react";
import { isBlurhashValid } from "blurhash";
import { Blurhash } from "react-blurhash";

const DEFAULT_BLURHASH = "L7OgHHof00of01kB~pj[~Uay~Vj@";

const ImageLoaderComponent = ({ url, hashCode, alt, className, blurWidth, blurHeight,rounded }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const validHash = isBlurhashValid(hashCode || "").result ? hashCode : DEFAULT_BLURHASH;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = url;
  }, [url]);

  const roundedStyle = {
    borderRadius: '100%',
    overflow: 'hidden',
    width: blurWidth,
    height: blurHeight,
  };

  return (
    <>
      {imageLoaded ? (
        <img src={url} alt={alt} className={className} />
      ) : (
        rounded ? (
          <div style={roundedStyle}>
            <Blurhash
              hash={validHash}
              width={blurWidth}
              height={blurHeight}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
        ) : (
          <Blurhash
            hash={validHash}
            width={blurWidth}
            height={blurHeight}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )
      )
      }
    </>
  );
};

export default ImageLoaderComponent;
