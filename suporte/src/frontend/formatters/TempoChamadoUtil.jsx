export default function CalcularTempoChamado({tempoChamado}) {
  const dataInicio = (state) => state.chamado.chamados.dataInicio;
  const dataEncerramento = (state) => state.chamado.chamados.dataEncerramento;

  if (!dataInicio || !dataEncerramento) {
    return "Dados de início ou encerramento inválidos";
  }

  let dataAtual = new Date(dataInicio);
  let tempoDentroHorarioComercial = 0;

  while (dataAtual < dataEncerramento) {
    const diaDaSemana = dataAtual.getDay();
    const horaAtual = dataAtual.getHours();

    if(diaDaSemana >= 1 && diaDaSemana <= 5 && horaAtual >= 8 && horaAtual < 18){
        tempoDentroHorarioComercial += 1;
    }

    dataAtual.setTime(dataAtual.getTime() + (60 * 60 * 1000));
  }

  const horas = Math.floor(tempoDentroHorarioComercial);
  const minutos = Math.floor(
    ((tempoDentroHorarioComercial % 1) * 60));

  return `${horas}h:${minutos}min`;
}