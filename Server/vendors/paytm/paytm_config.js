// module.exports = {
//   paytm_config: {
// 		MID: 'IRrnBd64078718371804',
// 		WEBSITE: 'http://18.223.243.107:3000/verify_checksum',
//     CHANNEL_ID: 'WAP',
//     INDUSTRY_TYPE_ID: 'Retail',
//     MERCHANT_KEY : 'uWglVXk%19X8@hWI'
// 	}
// }


// Test Merchant ID
// KXmJwx37041652600812
// Test Merchant Key
// LZ9oioS2W1vuMH7!
// Website
// WEBSTAGING
// Industry Type
// Retail
// Channel ID (For Website)
// WEB
// Channel ID (For Mobile Apps)
// WAP
// Transaction URL
// https://securegw-stage.paytm.in/order/process
// Transaction Status URL
// https://securegw-stage.paytm.in/order/status



// Production
// Merchant ID
// RZnaQK97736440629656
// Merchant Key
// kD7MVj@u!#dm!IOJ
// Industry Type
// Retail
// Channel ID (For Website)
// WEB
// Channel ID (For Mobile Apps)
// WAP
// Transaction URL
// https://securegw.paytm.in/order/process
// Transaction Status URL
// https://securegw.paytm.in/order/status


module.exports = {
  paytm_config: {
		MID: 'KXmJwx37041652600812',
		WEBSITE: 'WEBSTAGING',
    CHANNEL_ID: 'WAP',
    INDUSTRY_TYPE_ID: 'Retail',
    MERCHANT_KEY : ' LZ9oioS2W1vuMH7!',
    API_URL:'https://securegw.paytm.in/merchant-status/getTxnStatus'
	}
}