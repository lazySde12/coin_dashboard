export function currencyFormat(num, currencyType) {
    let symbol;
    switch(currencyType) {
      case 'usd':
        symbol = '$';
        break;
      case 'eur':
        symbol = '€';
        break;
      case 'gbp':
        symbol = '£';
        break;
      case 'jpy':
      case 'cny':
      case 'rmb': // If you want to include Chinese Renminbi
        symbol = '¥';
        break;
      case 'aud':
      case 'cad':
      case 'nzd':
        symbol = 'A$'; // Adjust according to your need, CAD and NZD usually use just $
        break;
      case 'krw':
        symbol = '₩';
        break;
      case 'inr':
        symbol = '₹';
        break;
      case 'rub':
        symbol = '₽';
        break;
      case 'brl':
        symbol = 'R$';
        break;
      case 'sar':
      case 'aed':
        symbol = 'د.إ'; // AED - United Arab Emirates Dirham
        break;
      case 'sek':
      case 'nok':
      case 'dkk':
        symbol = 'kr';
        break;
      case 'chf':
        symbol = 'CHF';
        break;
      case 'pln':
        symbol = 'zł';
        break;
      case 'try':
        symbol = '₺';
        break;
      case 'thb':
        symbol = '฿';
        break;
      case 'php':
        symbol = '₱';
        break;
      case 'idr':
        symbol = 'Rp';
        break;
      case 'huf':
        symbol = 'Ft';
        break;
      case 'czk':
        symbol = 'Kč';
        break;
      case 'ils':
        symbol = '₪';
        break;
      case 'ars':
        symbol = '$'; // Argentine Peso also uses $
        break;
      // ... add more currencies as needed
      default:
        symbol = ''; // No symbol for cryptocurrencies or unknown currencies
    }
  
    // Format the number with two decimal places and commas as thousands separators
    let formattedNum = num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    
    // For cryptocurrencies, you might want to handle them differently since they don't have a traditional currency symbol and can have many decimal places
    if(['btc', 'eth', 'ltc', 'bch', 'bnb', 'eos', 'xrp', 'xlm', 'link', 'dot', 'yfi', 'sats', 'bits'].includes(currencyType)) {
      // You might want to allow more decimal places for cryptocurrencies, and no symbol is necessary
      formattedNum = num.toFixed(2); // Or however many decimal places you feel are appropriate
    }
  
    return symbol + formattedNum;
  }
  