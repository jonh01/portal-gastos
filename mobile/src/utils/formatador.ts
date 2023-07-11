export const formatarData = (data: string) => {
  const partes = data.split("-");
  if (partes.length === 3) {
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    return dia + "/" + mes + "/" + ano;
  } else {
    return data;
  }
};

export const formatarSaldoNumber = (val: string) => {
  const valSub = val.substring(2);
  const aux = valSub.replace(/\./g, "");
  const retorno = aux.replace(/,/g, ".");

  return retorno == "" ? parseFloat(aux) : parseFloat(retorno);
};

export const formatarSaldoView = (saldo: number) => {
  const saldoString = saldo.toFixed(2).toString();
  const partes = saldoString.split(".");
  
  if (partes.length === 2) {
    const [real, centavo] = partes;
    const realFracionado = real.split("").reverse().reduce((acc, digit, index) => {
      if (index === 2) {
        return '.' + digit + acc;
      }
      return digit + acc;
    }, "");
    
    return `R$ ${realFracionado},${centavo}`;
  }
  
  return saldoString;
};
