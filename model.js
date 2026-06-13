const {redis} = require('./config');

class Model {
    static async getRibbon() {
        const rawData = await redis.get("ribbon");
        if (!rawData) {
            throw new Error("NOT_INITIALIZED");
        }
        return JSON.parse(rawData);
    }
    static async create(data) {
        try {
            const ribbonData = {
                totalLength: Number(data.totalLength),
                pricePerMeter: Number(data.pricePerMeter),
                totalPrice: 0 
            };

            await redis.set("ribbon", JSON.stringify(ribbonData));
            return ribbonData;
        } catch (err) {
            console.error("Model Create Error:", err);
            throw err;
        }
    }

    static async cut(requestedMeters) {
        try {
            const ribbon = await this.getRibbon();

            if (ribbon.totalLength < requestedMeters || ribbon.totalLength === 0) {
                throw new Error("NO_RIBBON");
            }

            ribbon.totalLength -= requestedMeters;
            ribbon.totalPrice += (requestedMeters * ribbon.pricePerMeter);

            await redis.set("ribbon", JSON.stringify(ribbon));
            
            return ribbon;
        } catch (err) {
            console.error("Model Cut Error:", err);
            throw err; 
        }
    }

    static async incrementPrice(amount) {
        try {
            const ribbon = await this.getRibbon();
            
            ribbon.pricePerMeter = Number(ribbon.pricePerMeter) + Number(amount);

            await redis.set("ribbon", JSON.stringify(ribbon));
            return ribbon;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async decrementPrice(amount) {
        try {
            const ribbon = await this.getRibbon();

            const newPrice = Number(ribbon.pricePerMeter) - Number(amount);
        
            if (newPrice < 0) {
                throw new Error("PRICE_TOO_LOW");
            }

            ribbon.pricePerMeter = newPrice;

            await redis.set("ribbon", JSON.stringify(ribbon));
            return ribbon;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async getTotalPrice() {
        try {
            const ribbon = await this.getRibbon();

            return {
                totalPrice: Number(ribbon.totalPrice)
            };
        } catch (err) {
            console.error("Model Get Total Price Error:", err);
            throw err;
        }
    }
}
module.exports = Model;