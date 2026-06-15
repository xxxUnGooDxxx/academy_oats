// ── Академия ОАТС: приём результатов экзамена в Google Таблицу ──
// Код для Google Apps Script. Как подключить — см. google-apps-script.md.

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Результаты')
      || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Заголовки — один раз, если лист пустой
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Дата',
        'Имя',
        'Результат, %',
        'Баллы',
        'Из',
        'Сдан',
        'Блоков пройдено',
        'Детали по блокам',
        'Устройство',
      ]);
    }

    sheet.appendRow([
      data.date ? new Date(data.date) : new Date(),
      data.name || '',
      data.examPct,
      data.examScore,
      data.examTotal,
      data.passed ? 'да' : 'нет',
      data.blocksPassed,
      data.blocksSummary || '',
      data.userAgent || '',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
