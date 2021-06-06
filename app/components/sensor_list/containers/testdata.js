const produceAlertData = props => {

    const alerts = [
        { type: "engine", id: 1, count: Math.floor(Math.random() * 50) },
        { type: "construction", id: 2, count: Math.floor(Math.random() * 50) },
        { type: "music", id: 3, count: Math.floor(Math.random() * 50) },
        { type: "human", id: 4, count: Math.floor(Math.random() * 50) }
    ];

    alerts.sort((left, right) => (right.count - left.count));
    alerts.splice(3, 1, { type: "other", id: 5, count: Math.floor(Math.random() * 50) });
    return alerts
}

export default stackData = [
    {
        color: "#4c4",
        data: ["Blk 363 BukitBatok St 32", "22 dB", produceAlertData(), true]
    },
    {
        color: "#4c4",
        data: ["Blk 364 BukitBatok St 31", "24 dB", produceAlertData(), true]
    },
    {
        color: "#e55",
        data: ["3 CleanTech LoopNanyang Ave", "No data", produceAlertData(), true]
    },
    {
        color: "#e55",
        data: ["25 Kaki BukitRoad 4", "No data", produceAlertData(), true]
    },
    {
        color: "#4c4",
        data: ["33 Tyrwhitt Road", "85 dB", produceAlertData(), true]
    },
    {
        color: "#4c4",
        data: ["The Live Turtle &Tortoise Museum", "27 dB", produceAlertData(), false]
    },
    {
        color: "#e55",
        data: ["Bus interchange27071", "No data", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["Singapore ScienceCentre", "85 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["United SquareShopping mall", "25 dB", produceAlertData(), false]
    },
    {
        color: "#e55",
        data: ["Buona MRTStation EW21", "No data", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["NTUitive, 71Nanyang Drive", "85 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["United state mall", "28 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["Buona Vista MRTStation EW21", "17 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["71Nanyang Drive", "87 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["sBlk 806 WoodlandsSt 81", "29 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["BLL 806 WoodlandsSt 81", "20 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["Blk 5 Dover Cres - soc17", "83 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["Blk 825 WoodlandsSt 81", "23 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["Tyrwhitt Road", "22 dB", produceAlertData(), false]
    },
    {
        color: "#4c4",
        data: ["Blk 806 WoodlandsSt 81", "81 dB", produceAlertData(), false]
    }
] 
