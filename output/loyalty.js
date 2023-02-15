const authEndpoints = {
  loginPOST: () => `${getBaseURL()}/oauth/token`,
  tokenGET: () => `${getBaseURL()}/oauth/token/info`,
};

const partnerEndpoints = {
  partnerDetailsGET: () => `${getBaseURL()}/loyalty/api/v1/partners`,
};

const venueEndpoints = {
  findCustomerByPhoneGET: ({ currentVenueId, nationalNumber, internationalNumber }) =>
    `${getBaseURL()}/loyalty/api/v1/guests/search?venue_id=${currentVenueId}&phone_number[]=${nationalNumber}&phone_number[]=${internationalNumber}`,
  fetchHistoryGET: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions?venue_id=${currentVenueId}&per_page=50&page=1`,
  fetchHistoryByDayGET: ({ currentVenueId, date }) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions?venue_id=${currentVenueId}&start_date=${date}&end_date=${date}&per_page=500&page=1&transaction_type=collection`,
  addCustomerPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/guests?venue_id=${currentVenueId}`,
  updateCustomerPATCH: ({ currentVenueId, customerId }) =>
    `${getBaseURL()}/loyalty/api/v1/guests/${customerId}?venue_id=${currentVenueId}`,
  fetchSettingsGET: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/venues/${currentVenueId}/loyalty_data_gathering_settings`,
};

const guestEndpoints = {
  fetchCampaignsForGuestGET: ({ guestId, currentVenueId }) =>
    `${getBaseURL()}/loyalty/api/v1/guests/${guestId}/loyalty_campaign_logs?venue_id=${currentVenueId}&is_expired=false`,
  redeemCampaignPATCH: ({ guestId, campaignId }) =>
    `${getBaseURL()}/loyalty/api/v1/guests/${guestId}/loyalty_campaign_logs/${campaignId}/claim`,
};

const claimEndpoints = {
  claimAmountPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions?venue_id=${currentVenueId}`,
};

const redeemEndpoints = {
  redeemAmountPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions?venue_id=${currentVenueId}`,
  submitOTPPOST: (transactionId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions/${transactionId}/verify_otp`,
  resendOTPPOST: (transactionId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions/${transactionId}/resend_otp`,
};

const deductEndpoints = {
  deductAmountPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions?venue_id=${currentVenueId}`,
};

const reportEndpoints = {
  fetchReportsGET: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_reports?venue_id=${currentVenueId}`,
  createReportPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_reports?venue_id=${currentVenueId}`,
  closeDayPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_reports?venue_id=${currentVenueId}`,
  fetchDaysReportsGET: ({ currentVenueId, date }) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_reports?venue_id=${currentVenueId}&start_date=${date}&end_date=${date}`,
};

const noteEndpoints = {
  addNotePOST: ({ currentVenueId, transactionId }) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions/${transactionId}?venue_id=${currentVenueId}`,
};

const addEndpoints = {
  addAmountPOST: (currentVenueId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions?venue_id=${currentVenueId}`,
};

const memberInterfaceEndpoints = {
  fetchPublicAccountGET: ({ venueSlug, phoneNumber }) =>
    `${getBaseURL()}/loyalty/api/v1/public/guests?slug=${venueSlug}&phone_number=${phoneNumber}`,
  fetchSecureAccountGET: ({ venueSlug, phoneNumber, authToken }) =>
    `${getBaseURL()}/loyalty/api/v1/public/guests?slug=${venueSlug}&phone_number=${phoneNumber}&auth_token=${authToken}`,
  fetchAvailableCampaignsGET: ({ venueSlug, tokenId }) =>
    `${getBaseURL()}/loyalty/api/v1/public/loyalty_campaign_logs?slug=${venueSlug}&token_id=${tokenId}`,
  fetchSecureAvailableCampaignsGET: ({ venueSlug, tokenId, authToken }) =>
    `${getBaseURL()}/loyalty/api/v1/public/loyalty_campaign_logs?slug=${venueSlug}&token_id=${tokenId}&auth_token=${authToken}`,
  fetchAccountHistoryGET: ({ venueSlug, tokenId, page = 1 }) =>
    `${getBaseURL()}/loyalty/api/v1/public/loyalty_transactions?slug=${venueSlug}&token_id=${tokenId}&per_page=50&page=${page}`,
  toggleSmsSubscriptionGET: ({ venueSlug, tokenId }) =>
    `${getBaseURL()}/loyalty/api/v1/public/toggle_subscription?slug=${venueSlug}&token_id=${tokenId}`,
};

const signupEndpoints = {
  searchGuestGET: ({ venueSlug, phoneNumber }) =>
    `${getBaseURL()}/loyalty/api/v1/public/guests/search?slug=${venueSlug}&phone_number=${phoneNumber}`,
  sendProfileLinkGET: ({ venueSlug, tokenId }) =>
    `${getBaseURL()}/loyalty/api/v1/public/guests/get_link?slug=${venueSlug}&token_id=${tokenId}`,
  fetchVenueLoyaltySettingsGET: ({ venueSlug }) =>
    `${getBaseURL()}/loyalty/api/v1/public/venues/${venueSlug}`,
  registerAsMemberPOST: ({ venueSlug }) =>
    `${getBaseURL()}/loyalty/api/v1/public/guests/sign_up?slug=${venueSlug}`,
};

const validationEndpoints = {
  validatePassword: (transactionId) =>
    `${getBaseURL()}/loyalty/api/v1/loyalty_transactions/${transactionId}/verify_password`,
};
