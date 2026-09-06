// WebMCP (deneysel W3C taslagi, 2026): <form> uzerinde toolname/tooldescription
// oznitelikleri tarayicilarin/yapay zeka ajanlarinin formu bir "arac" olarak
// tanimasini saglar. React'in kendi tip tanimlarinda bu oznitelikler
// bulunmadigi icin burada genisletiliyor. tool-param-description zaten
// tirali bir oznitelik oldugundan (data-* gibi) ek bir tanima gerek yok.
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- T zaten HTMLAttributes<T> icin gerekli, sadece yeni alanlarda kullanilmiyor
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
}

export {};
