export default function useFiles() {

    const allowedFiles = (files: Array<any>, accept: string[]) =>
    [...files].filter((f) => accept.includes(f?.image?.type));


    const esBase64 = (str: string) => {
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return base64Regex.test(str);
    };

    const convertFileToRender = (file: any) => {
        return new Promise((resolve) => {
          const buildImage = {
                base64: "",
                file: null,
                url: "",
          };

          if (file !== undefined && typeof file !== "string") {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
                buildImage.base64 = e.target.result,
                buildImage.file = file,
                buildImage.url = "",
              resolve(buildImage);
            };
            reader.readAsDataURL(file);
          } else if (file !== "") {
            if (esBase64(file)) {
                buildImage.base64 = file;
            } else {
                buildImage.url = file;
            }
            resolve(buildImage);
          } else {
            resolve(buildImage);
          }
        });
      };
    return { convertFileToRender, esBase64, allowedFiles };
};

