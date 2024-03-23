export default function formatarData(data) {
  if (!data) return "";
  const dataFormatada = new Date(data);

  const dia = String(dataFormatada.getDate()).padStart(2, "0");
  const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
  const ano = dataFormatada.getFullYear();
  const hora = String(dataFormatada.getHours()).padStart(2, "0");
  const minutos = String(dataFormatada.getMinutes()).padStart(2, "0");

  const dataHoraFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

  return dataHoraFormatada;
}
