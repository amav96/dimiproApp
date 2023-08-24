export interface Country {
    id: number;
    name: string;
    iso3: string;
    numeric_code: string;
    iso2: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    subregion: string;
    timezones: {
      zoneName: string;
      gmtOffset: number;
      gmtOffsetName: string;
      abbreviation: string;
      tzName: string;
    }[];
    translations: {
      [key: string]: string;
    };
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
  }

export interface State {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    iso2: string;
    type: string;
    latitude: string;
    longitude: string;
  }

export  interface City {
    id: number;
    name: string;
  }