const primary = {
    auth: "/auth_",
}

export const endpoints = {
  LOGIN: primary.auth + "/login",
  REGISTER: primary.auth + "/registro",
  USUARIO: "/usuario_",
  DOCUMENTO: {
    PROCESSAR: "/documento_/processar",
    VERIFICAR: "/documento_/verificar",
    ANALISAR: "/documento_/analisar",
    RESULTADO: "/documento_/resultado",
  }
}