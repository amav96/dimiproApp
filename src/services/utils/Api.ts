const isFileInParams = (params: any) => {
    let hasFile = false
    let array = Object.keys(params);
    let availablesFiles = ['image','pdf','csv','excel'];
    try {
        for (let index = 0; index < array.length; index++) {
            const k = array[index];
            const param: any | Array<any> = params[k as keyof object];

            if(typeof param === 'object' &&
            (
                (Array.isArray(param) && param.some((val : any) => val?.type &&  availablesFiles.includes(val?.type?.split('/')[0])))  ||
                (param.type && availablesFiles.includes(param.type?.split('/')[0]))
            )){
                console.log('down')
                hasFile = true
                break
            }
        }
    } catch (error) {
        console.log(error)
    }
    return hasFile
}

const appendForm = async (params : any, deepFileInArray: boolean = false) :Promise<FormData> =>  {
    let availablesFiles = ['image','pdf','csv','excel'];
    return new Promise((resolve) => {
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        const param = params[key as keyof object];
        if(typeof param === 'object' &&
            Array.isArray(param) &&
            (deepFileInArray || (Array.isArray(param) &&  param.some((val : any) => availablesFiles.includes(val?.type?.split('/')[0]))))){
                param.forEach((element: any, i: number) => {
                    formData.append(`${key}[${i}]`, element);
                });
        }else {
            formData.append(key, param);
        }
      });
      resolve(formData);
    });
}

interface Config {
    multipleFile?: boolean,
    appendForm?: boolean
}

export const serializeParams = async (params : object, config: Config = {} ) :Promise<object> => {
    let build: any = {}
    let hasFile = config.hasOwnProperty('multipleFile') ? config.multipleFile : isFileInParams(params)
    if(hasFile){
        build = await appendForm(params, hasFile)
    } else if(config.hasOwnProperty('appendForm') && config.appendForm){
        build = await appendForm(params)
    } else {
        Object.keys(params).forEach((key) => {
            let currentParam : any = params[key as keyof object];
            if(typeof currentParam === 'object' && Array.isArray(currentParam)){
                build[key as keyof object] = currentParam.toString()
            }else{
                build[key as keyof object] = currentParam
            }
        })
    }
    return build
}