const injectableAreas = {
    1: {
        'eng': ["communicating information about family life", 'expressing likes and dislikes', "identifying different sources of information", "summarising printed information", "using adjectives and verbs properly"],
        'phy': ['one', 'two', 'three', 'four', 'five'],
        'hist': ['understanding the origins of migrants into E.Africa', 'knowing reasons for migration into E.Africa', 'analysing the contribution of cultural handcrafts', 'differentiating between centralised and non-centralised states', 'understanding the role of culture in family matters'],
        'geog': ['drawing diagrams to relate earth and sun', 'calculating time using longitude','understanding elements of weather', 'understanding effects of weather','using maps and graphs to analyse populations'],
        'biol': ['one', 'two', 'three', 'four', 'five'],
        'math': ['one', 'two', 'three', 'four', 'five'],
        'chem':['determining whether a substance is pure or not', 'devising ways of separating different mixtures', 'differentiating between mixtures, elements and compounds', 'recognising temporary and permanent changes to matter', 'knowing conditions that cause different changes to matter'],
        'ped': ['one', 'two', 'three', 'four', 'five'],
        'agr': ['one', 'two', 'three', 'four', 'five'],
        'ent': ['one', 'two', 'three', 'four', 'five'],
        'art': ['one', 'two', 'three', 'four', 'five'],
        'ict': ['one', 'two', 'three', 'four', 'five'],
        'cre': ['one', 'two', 'three', 'four', 'five'],
        'ire': ['one', 'two', 'three', 'four', 'five'],
        'lug': ['one', 'two', 'three', 'four', 'five'],
        'lit': ['one', 'two', 'three', 'four', 'five'],
        'kis': ['one', 'two', 'three', 'four', 'five']
    },
    2: {
        'eng': ["forming personal opinions based on media accounts", "using interrogative clauses", "using direct and indirect speech", "understanding opinions on human rights", "debating sensitive gender topics"],
        'phy': [],
        'hist': ['analysing the 1900 Buganda agreement signing', 'appreciating the effects of colonial rule systems', 'appreciating the impact of colonial economy', 'differentiating between collaboration and resistance to colonialism', 'knowing how E.Africans got involved in world wars'],
        'geog': ['understanding the environmental effects of industries', 'knowing major fishing areas and methods', 'analysing graph trends of fish stock and catches', 'appreciating the importance of conserving wildlife', 'using fieldwork to study a local factory'],
        'biol': [],
        'math': [],
        'chem': ['comparing reactivities of metals and determining outcomes', 'comparing properties of metals and their alloys', 'explaining the greenhouse effect', 'understanding the hardening and softening of water', 'differentiating between renewable and non-renewable fuels'],
        'ped': [],
        'agr': [],
        'ent': [],
        'art': [],
        'ict': [],
        'cre': [],
        'ire': [],
        'lug': [],
        'lit': [],
        'kis': []
    },
    3: {
        'eng': ["identifying life examples of honesty or dishonesty", "writing poems or compositions on integrity", "knowing some common idioms", "being able to persuade others", "using descriptive language"],
        'phy': [],
        'hist': ['knowing how E.Africans got involved in world wars', 'understanding the causing events of world wars', 'appreciating the acts in the struggle for independence', 'understanding post-independence challenges we faced', "comparing countries' struggles for independence"],
        'geog': ["using contours to describe an area's relief", "using survey maps to describe drainage and vegetation", "knowing the position and size of Africa", "sketching a map to show relief regions", "recognising physical features from photographs"],
        'biol': ["understanding the process of excretion in animals","describing symptoms of common hormonal disorders", "differentiating between voluntary and involuntary responses", "understanding the working of human sense organs", "identifying the roles of different brain parts"],
        'math': [],
        'chem': ['understanding the hardening and softening of water', 'differentiating between renewable and non-renewable fuels', 'carrying out chemical reactions to prepare various salts', 'classifying the chemical elements into groups and periods', 'explaining common properties of elements in the periodic table'],
        'ped': [],
        'agr': [],
        'ent': [],
        'art': [],
        'ict': [],
        'cre': [],
        'ire': [],
        'lug': [],
        'lit': [],
        'kis': []
    },
    4: {}
}
export default function bringComms(subj, theClass, level) {
    let numtoggle = Math.floor(Math.random() * 5)
    const numtoggle2 = Math.floor(Math.random() * 5)
    while (numtoggle == numtoggle2) {
        numtoggle = Math.floor(Math.random() * 5)
    }
    const cwdAreas = injectableAreas[theClass][subj][numtoggle]
    const cwdAreas2 = injectableAreas[theClass][subj][numtoggle2]
    const rawComms = [
        `Learner finds it considerably difficult in concepts like ${cwdAreas} and is encouraged to personally revisit them from the basics`,
        `Learner has grasped little concerning ${cwdAreas} and cannot easily recount their experiences with ${cwdAreas2}.`,
        `Learner demonstrates evidence of exposure to ${cwdAreas}, although they need more encouragement to perfect their skills, for example in ${cwdAreas2}.`,
        `Learner exhibits a solid grasp of ${cwdAreas} and they have good command of concepts like ${cwdAreas2}.`,
        `Learner's competence in ${cwdAreas} is exceptional and commendable. They showed impressive performance when it comes to ${cwdAreas2}.`
    ]
    return rawComms[level]
}
