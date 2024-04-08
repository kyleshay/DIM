export const normalToReducedMod: { [normalModHash: number]: number } = {
  '14520248': 2318667184,
  '40751621': 4149682173,
  '48578555': 3047946307,
  '84503918': 1208761894,
  '193878019': 2267311547,
  '319908131': 792400107,
  '335129856': 2801811288,
  '350061697': 2519597513,
  '377010989': 1153260021,
  '450381139': 4283953067,
  '467550918': 1017385934,
  '531057500': 830369300,
  '534479613': 2436471653,
  '554409585': 644105,
  '633101315': 2771425787,
  '638704972': 3456250548,
  '686455429': 3075302157,
  '688956976': 56663992,
  '707237917': 657773637,
  '721001747': 1801153435,
  '802695661': 2815817957,
  '837201397': 3188328909,
  '856936828': 2136310244,
  '953234331': 3539253011,
  '967052942': 96682422,
  '1024379611': 422994787,
  '1039115606': 3791691774,
  '1079896271': 634608391,
  '1097608874': 579997810,
  '1125523126': 3046678542,
  '1130820873': 3461249873,
  '1180408010': 2568808786,
  '1193713026': 1672155562,
  '1237786518': 1124184622,
  '1262438062': 2325151798,
  '1301391064': 877723168,
  '1305536863': 1891463783,
  '1388734897': 897335593,
  '1435557120': 3896141096,
  '1456244351': 846698094,
  '1553790504': 1019574576,
  '1589556860': 2888195476,
  '1669792723': 2413278875,
  '1677180919': 2479297167,
  '1755737153': 1783952505,
  '1763668984': 2562645296,
  '1763780622': 1139671158,
  '1781551382': 1255614814,
  '1834163303': 2246316031,
  '1971149752': 1103878128,
  '2059068466': 2794359402,
  '2076329105': 1561736585,
  '2257238439': 1305848463,
  '2319885414': 2283894334,
  '2407398462': 2305736470,
  '2414626352': 1604394872,
  '2447449706': 1709236482,
  '2452545487': 2634786903,
  '2467203039': 2214424583,
  '2485657760': 965934024,
  '2526773280': 411014648,
  '2532323436': 2113881316,
  '2586562813': 2237975061,
  '2595839237': 3775800797,
  '2657604783': 1702273159,
  '2719698929': 331268185,
  '2724068510': 3847471926,
  '2724608735': 1866564759,
  '2734674728': 3174771856,
  '2773358872': 1210012576,
  '2793473444': 3184690956,
  '2793548555': 703902595,
  '2921714558': 2526922422,
  '2959504464': 1118428792,
  '3000428062': 3013778406,
  '3067648983': 531665167,
  '3094620656': 293178904,
  '3112965625': 1501094193,
  '3149307605': 2982306509,
  '3160387771': 1044888195,
  '3194530172': 3846931924,
  '3323910164': 3979300428,
  '3410844187': 2788997987,
  '3437323171': 3887037435,
  '3462414552': 3294892432,
  '3467460423': 3914973263,
  '3573031954': 3276278122,
  '3581696649': 2805854721,
  '3599522901': 2031584061,
  '3685945823': 3657186535,
  '3719981603': 930759851,
  '3726719281': 3245543337,
  '3775916472': 3675553168,
  '3926119246': 3279257734,
  '3938489430': 1036557198,
  '3979621113': 3598972737,
  '3980769162': 3224649746,
  '3994043492': 1627901452,
  '4039026690': 4267244538,
  '4046357305': 1901221009,
  '4081595582': 2245839670,
  '4182064480': 1924584408,
  '4183296050': 3808902618,
  '4204488676': 2493161484,
  '4244246940': 95934356,
  '4255093903': 1086997255,
  '4287799666': 1763607626,
  '4287822553': 2303417969,
  '4294909663': 3798468567,
};

export const reducedToNormalMod: { [reducedModHash: number]: number } = Object.fromEntries(
  Object.entries(normalToReducedMod).map(([normal, reduced]) => [reduced, parseInt(normal, 10)]),
);
