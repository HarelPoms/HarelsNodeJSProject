const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {
  if (!card.image) {
    card.image = {};
  }
  card.image = {
    url:
      card.image.url ||
      "https://cdn.pixabay.com/photo/2014/08/25/22/53/business-card-427513_1280.png",
    alt: card.image.alt || "business card image",
  };
  return {
    ...card,
    address: {
      ...card.address,
      state: card.address.state || "",
    },
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
