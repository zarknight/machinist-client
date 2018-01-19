const parts = {
  icon: "/assets/images/home/sets.png",
  icbg: "#53a9e9",
  name: "汽车部件",
  desc: "构成、零件",
  url: "/pages/knowledge/kw-list/kw-list?type=parts",
  data: { cid: 5 }
}

const modification = {
  icon: "/assets/images/home/modify.png",
  icbg: "#f45f90",
  name: "汽车改装",
  desc: "知识、注意项",
  url: "/pages/knowledge/kw-list/kw-list?type=modification",
  data: { cid: 22 }
}

const repair = {
  icon: "/assets/images/home/repair.png",
  icbg: "#62c66f",
  name: "维修保养",
  desc: "维修、保养美容",
  url: "/pages/knowledge/kw-list/kw-list?type=repair",
  data: { cid: 16 }
}

const term = {
  icon: "/assets/images/home/prof.png",
  icbg: "#ea7554",
  name: "专业名词",
  desc: "名词解释",
  url: "/pages/knowledge/kw-list/kw-list?type=term",
  data: { cid: 24 }
}

const brand = {
  icon: "/assets/images/home/brand.png",
  icbg: "#5f99f4",
  name: "品牌故事",
  desc: "品牌介绍、人物",
  url: "/pages/knowledge/kw-list/kw-list?type=brand",
  data: { cid: 25 }
}

const insurance = {
  icon: "/assets/images/home/insurance.png",
  icbg: "#28c196",
  name: "车险知识",
  desc: "车险、理赔知识",
  url: "/pages/knowledge/kw-list/kw-list?type=insurance",
  data: { cid: 23 }
}

const skill = {
  icon: "/assets/images/home/skill.png",
  icbg: "#ff9900",
  name: "驾驶相关",
  desc: "驾驶技巧、法规",
  url: "/pages/knowledge/kw-list/kw-list?type=skill",
  data: { cid: 28 }
}

const race = {
  icon: "/assets/images/home/race.png",
  icbg: "#7457d7",
  name: "汽车赛事",
  desc: "赛事、赛道",
  url: "/pages/knowledge/kw-list/kw-list?type=race",
  data: { cid: 19 }
}

module.exports = {
  sectionMap: {
    "parts": parts,
    "modification": modification,
    "repair": repair,
    "term": term,
    "brand": brand,
    "insurance": insurance,
    "skill": skill,
    "race": race
  },
  sectionList: [{
    title: "基础知识",
    desc: "汽车的构成、保养、维护等",
    icon: "/assets/images/home/sec1.png",
    color: "#1296db",
    items: [parts, modification, repair, term]
  }, {
    title: "兴趣知识",
    desc: "汽车的历史、品牌、赛事等",
    icon: "/assets/images/home/sec2.png",
    color: "#ff9900",
    items: [brand, race, insurance, skill]
  }]
}
