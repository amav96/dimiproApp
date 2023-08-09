import React, { useRef } from "react";

const allowedFiles = (files: Array<any>, accept: string[]) =>  [...files].filter((f) => accept.includes(f?.image?.type))

 const convertBase64 = (image : any, name = 'img') => {
    return new Promise((resolve) => {
      const typeImg = image.split('/')[1].split(';')[0];
      const arr = image.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      const nameImage = name.replace(/[^A-Za-z]/g, '').substr(0, 20) + image.split('/')[4].substr(-5);
      const numRamdon = Math.floor(Math.random() * 1000) + 1;
  
      while (n > 0) {
        n -= 1;
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], `${numRamdon}-${nameImage}.${typeImg}`, { type: mime });
      resolve(file);
    });
  }

  const convertFileToRender = (file : any)  => {
    const buildImage = useRef({
      readyState: 0,
      image: {
        base64: "",
        file: null,
        url: "",
      },
    });
  
    if (file !== undefined && typeof file !== "string") {
      const reader = new FileReader();
      buildImage.current.readyState = reader.readyState;
      reader.onload = async (e: any) => {
        buildImage.current.readyState = reader.readyState;
        const image = {
          base64: e.target.result,
          file,
          url: "",
        };
        buildImage.current.image = image;
      };
      buildImage.current.readyState = reader.readyState;
      reader.readAsDataURL(file);
    } else if (file !== "") {
      let image = {
        base64: "",
        file: null,
        url: "",
      };
      if (esBase64(file)) {
        image.base64 = file;
      } else {
        image.url = file;
      }
      buildImage.current.image = image;
    }
    return buildImage;
  };
  

const esBase64 = (str: string) => {
  // Expresión regular para validar el formato Base64
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  return base64Regex.test(str);
}


export { convertFileToRender, esBase64, allowedFiles,convertBase64 };