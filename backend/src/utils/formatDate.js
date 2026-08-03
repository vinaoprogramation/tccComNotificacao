function formatarData(isoString) {

  if (!isoString) {
    return null;
  }

  const data = new Date(isoString);

  if (isNaN(data)) {
    return null;
  }

  const formatoBrasil = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo'
  });

  return formatoBrasil.format(data);
}


module.exports = {
  formatarData
};