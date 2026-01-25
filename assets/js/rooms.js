const roomData = {
    demo: {
        id: "demo",
        name: "Demo Room",
        subtitle: "Full Interactive Demo",
        baseImage: "assets/images/room-base-solid.png",
        isDemo: true,
        devices: [
            { id: "light1", name: "Wall Sconce Left", icon: "far fa-lightbulb" },
            { id: "light2", name: "Wall Sconce Right", icon: "far fa-lightbulb" },
            { id: "fan", name: "Smart Fan", icon: "fas fa-fan" },
            { id: "ceiling", name: "Profile Light", icon: "fas fa-th-large" },
            { id: "lamp", name: "Floor Lamp", icon: "fas fa-couch" },
            { id: "tv", name: "Smart TV", icon: "fas fa-tv" },
            { id: "ac", name: "AC Unit", icon: "fas fa-snowflake" },
            { id: "purifier", name: "Air Purifier", icon: "fas fa-wind" }
        ]
    },
    living: {
        id: "living",
        name: "Living Room",
        subtitle: "Luxury & Comfort",
        baseImage: "assets/images/room-v2-on.png",
        devices: [
            { id: "l-light1", name: "Main Light", icon: "fas fa-lightbulb" },
            { id: "l-light2", name: "Accent Light", icon: "far fa-lightbulb" },
            { id: "l-fan", name: "Ceiling Fan", icon: "fas fa-fan" },
            { id: "l-ceiling", name: "Ceiling Profile", icon: "fas fa-th-large" },
            { id: "l-lamp", name: "Side Lamp", icon: "fas fa-couch" },
            { id: "l-tv", name: "Smart TV", icon: "fas fa-tv" },
            { id: "l-ac", name: "Hall AC", icon: "fas fa-snowflake" },
            { id: "l-purifier", name: "Air Purifier", icon: "fas fa-wind" }
        ]
    },
    bedroom2: {
        id: "bedroom2",
        name: "Master Suit",
        subtitle: "Elegant Living",
        baseImage: "assets/images/bedroom2.avif",
        devices: [
            { id: "b2-light", name: "Main Light", icon: "fas fa-lightbulb" },
            { id: "b2-ceiling", name: "Ceiling Profile", icon: "fas fa-th-large" },
            { id: "b2-floor", name: "Floor Profile", icon: "fas fa-couch" },
            { id: "b2-tv", name: "Smart TV", icon: "fas fa-tv" },
            { id: "b2-ac", name: "Bedroom AC", icon: "fas fa-snowflake" },
            { id: "b2-fan", name: "Smart Fan", icon: "fas fa-fan" },
            { id: "b2-curtain", name: "Curtain", icon: "fas fa-scroll" },
            { id: "b2-bedlight", name: "Bed light", icon: "fas fa-bed" }
        ]
    },
    bedroom: {
        id: "bedroom",
        name: "Child suit",
        subtitle: "Relax & Recharge",
        baseImage: "assets/img/hero/hero_bedroom.png",
        devices: [
            { id: "b-light", name: "Main Light", icon: "fas fa-lightbulb" },
            { id: "b-ceiling", name: "Ceiling Profile", icon: "fas fa-th-large" },
            { id: "b-floor", name: "Floor Profile", icon: "fas fa-couch" },
            { id: "b-tv", name: "Smart TV", icon: "fas fa-tv" },
            { id: "b-ac", name: "Bedroom AC", icon: "fas fa-snowflake" },
            { id: "b-fan", name: "Smart Fan", icon: "fas fa-fan" },
            { id: "b-curtain", name: "Curtain", icon: "fas fa-scroll" },
            { id: "b-bedlight", name: "Bed light", icon: "fas fa-bed" }
        ]
    },
    kitchen: {
        id: "kitchen",
        name: "Smart Kitchen",
        subtitle: "Precision Cooking",
        baseImage: "assets/images/kitchen.avif",
        devices: [
            { id: "k-light", name: "Light", icon: "fas fa-lightbulb" },
            { id: "k-profile", name: "Profile light", icon: "fas fa-th-large" },
            { id: "k-table", name: "Table light", icon: "fas fa-utensils" },
            { id: "k-fan", name: "Fan", icon: "fas fa-fan" },
            { id: "k-chimney", name: "Chimney", icon: "fas fa-wind" },
            { id: "k-fridge", name: "Refrigerator", icon: "fas fa-box" }
        ]
    },
    theater: {
        id: "theater",
        name: "Home Theater",
        subtitle: "Cinematic Experience",
        baseImage: "assets/images/theater-on.jpg",
        devices: [
            { id: "t-light", name: "Light", icon: "fas fa-lightbulb" },
            { id: "t-profile", name: "Profile light", icon: "fas fa-th-large" },
            { id: "t-ac", name: "AC", icon: "fas fa-snowflake" },
            { id: "t-projector", name: "Projector", icon: "fas fa-video" }
        ]
    },
    layout: {
        id: "layout",
        name: "3BHK Plan",
        subtitle: "House Layout",
        baseImage: "assets/images/houselayout.jpg",
        isLayout: true,
        devices: [
            { id: "sc-welcome", name: "Welcome", icon: "fas fa-door-open" },
            { id: "sc-away", name: "Away", icon: "fas fa-walking" },
            { id: "sc-secure", name: "Secure", icon: "fas fa-shield-alt" },
            { id: "sc-sleep", name: "Sleep", icon: "fas fa-bed" }
        ]
    },
    exterior: {
        id: "exterior",
        name: "Exterior",
        subtitle: "Smart Security",
        baseImage: "assets/images/exterior.avif",
        devices: [
            { id: "e-door", name: "Door light", icon: "fas fa-lightbulb" },
            { id: "e-lobby", name: "lobby light", icon: "far fa-lightbulb" }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = roomData;
}
