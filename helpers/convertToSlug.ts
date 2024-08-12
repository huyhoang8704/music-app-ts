import unidecode from "unidecode";


export const convertToSlug = (str: string) : string => {
    const unidecodeText = unidecode(str.trim()); // chuyển về không dấu
    const slug : string = unidecodeText.replace(/\s+/g, "-");
    return slug;
}