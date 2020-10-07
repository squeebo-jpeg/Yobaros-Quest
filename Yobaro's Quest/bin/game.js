//HTML
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


//Beginning State
let state = {}


//Functions
function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

//Text Nodes / Dialogue

const textNodes = [
  {
    id: 1,
    text: 'You awaken, unable to remember anything except the weapon you brought before your journey began...',
    options: [
      {
        text: 'Broadsword.',
        setState: { broadSword: true, LanternUnObtained: true, crossBow:false, LanternObtained: false },
        nextText: 2
      },
      {
        text: 'Crossbow.',
        setState: { crossBow: true, LanternUnObtained: true, broadSword: false, LanternObtained: false, nobroadSword: true },
        nextText: 3
      },
    ]
  },
  {
    id: 2,
    text: "You pick up your Broadsword and look around. As you wake up you hear the rustling of hay while you brush yourself off.",
    options: [
      {
        text: 'Look for signs of livestock.',
        nextText: 4
      },
      {
        text: 'Look for the exit.',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: "You pick up your Crossbow and look around. As you wake up you hear the rustling of hay while you brush yourself off.",
    options: [
      {
        text: 'Look for signs of livestock.',
        nextText: 4
      },
      {
        text: 'Look for the exit.',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: "You find yourself in the middle of a barn, you see droppings towards a dark and empty room. Smells like shit.",
    options: [
      {
        text: 'Follow droppings.',
        nextText: 6
      },
      {
        text: 'Ignore droppings.',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: "You ignore the stench of the barn and move towards an arch-way, noticing a small crack of light hidden behind boxes.",
    options: [
      {
        text: 'Move closer to inspect the crack.',
        nextText: 8
      },
      {
        text: 'Search the boxes.',
        nextText: 7,
        requiredState: (currentState) => currentState.LanternUnObtained,
      },
      {
        text: 'Go Back.',
        nextText: 4,
      }
    ]
  },
  {
    id: 6,
    text: "You follow the trail of shit, carefully treading as to not get any on your brand new Nike greaves. As you enter the dark room, you realize you cannot see and you are bound to step on poop at this point. Maybe you should return when you have a lantern. ",
    options: [
      {
        text: 'Search without Lantern.',
        requiredState: (currentState) => currentState.LanternUnObtained,
        nextText: 12
      },
      {
        text: 'Search with Lantern',
        requiredState: (currentState) => currentState.LanternObtained,
        setState: {scanningwithlantern: true},
        nextText: 11
      },
      {
        text: 'Go back.',
        nextText: 4
      },
    ]
  },
  {
    id: 7,
    text: "You inspect the boxes near the crack. The tape is crazy strong. Some bondage type quality gear. You'd definitely need a sharp edge to open one of these...",
    options: [
      {
        text: 'Use sword to open the boxes.',
        requiredState: (currentState) => currentState.broadSword,
        setState: {searching: true},
        nextText: 9
      },
      {
        text: 'Go back.',
        nextText: 4
      }
    ]
  },
  {
    id: 8,
    text: "You move closer to inspect the anomaly of light. It's sunlight bleeding through a cracked board. You could really fuck it up with some leverage.",
    options: [
      {
        text: 'Pry crossbow into the crack.',
        requiredState: (currentState) => currentState.crossBow,
        setState: {prying :true},
        nextText: 13
      },
      {
        text: 'Force sword into the crack.',
        requiredState: (currentState) => currentState.broadSword,
        setState: {forcing: true},
        nextText: 13.1,
      },
      {
        text: 'Go back.',
        nextText: 4
      },
    ]
  },
  {
    id: 9,
    text: "You use your broadsword as a boxcutter. Nice. Super useful. The first box you cut into was just filled with hay...",
    options: [
      {
        text: 'Dig through hay.',
        requiredState: (currentState) => currentState.searching,
        nextText: 10
      },
      {
        text: 'Go back.',
        nextText: 7
      }
    ]
  },
  {
    id: 10,
    text: "As you dig through the hay, cutting your hand relentlessly with some stupid dry grass, you find a Lantern! With this you could probably search dark rooms without stepping in feces.",
    options: [
      {
        text: 'Retrieve and go back.',
        setState: {LanternObtained :true, searching: false, LanternUnObtained: false},
        nextText: 5
      },
    ]
  },
  {
    id: 11,
    text: "You use the matches you found with the lantern to light it and brighten the room. Piles upon piles of shit. Try to avoid it.",
    options: [
      {
        text: 'Search the piles of defecation.',
        setState: {pulling: true},
        nextText: 15
      },
      {
        text: 'Search the stables.',
        requiredState: (currentState) => currentState.scanningwithlantern,
        setState: {stables: true},
        nextText: 14
      },
    ]
  },
  {
    
    id: 11.5,
    text: "Piles upon piles of shit. Try to avoid it.",
    options: [
      {
        text: 'Search the piles of defecation.',
        requiredState: (currentState) => currentState.scanningwithlantern,
        setState: {pulling: true},
        nextText: 15
      },
      {
        text: 'Search the stables.',
        requiredState: (currentState) => currentState.scanningwithlantern,
        setState: {stables: true},
        nextText: 14
      },
      {
        text: 'Go back.',
        nextText: 7
      },
    ]
  },
  {
    id: 12,
    text: "You bravely search the dark room, powering through the smell. You take a wrong step while traversing through the piles of shit and ruin the new Nike greaves. Out of sheer dissapointment you collapse and die, in the shit, left to rot.",
    options: [
      {
        text: 'Play Again?',
        setState: {searching: true},
        nextText: 1,
      },
    ]
  },
  {
    id: 13,
    text: "You huff and you puff, but the barn does not blow down; so you do the next best thing and equip your crossbow just to jam the limb into the crack and pry the board apart. It opens enough for you to fit through it and on the other side beholds a room with luminescence",
    options: [
      {
        text: 'Enter the room.',
        setState: {leftbarn: true},
        nextText: 19,
      },
      {
        text: 'Continue searching the barn.',
        setState: {searching: true},
        nextText: 4
      },
  
    ]
  },
  {
    id: 13.1,
    text: "You shove your sword through the crack and jump on the handle in attempt to pry it. The weight from your jump causes your blade to snap in half. The shrapnel from the broken blade gets in your eyes and you are rendered blind. Not being able to see, the next steps you took lead to your death. Tragic.",
    options: [
      {
        text: 'Play Again?',
        setState: {searching: true},
        nextText: 1
      },
    ]
  },
  {
    id: 14,
    text: "You poke around the stables, avoiding all sorts of debris, mostly shit. Upon looking in the back of the pens you notice a suspicious bundle of hay. You could probably move it with your hands.",
    options: [
      {
        text: 'Move it over',
        setState: {searching: true},
        nextText: 16,
      },
      {
        text: 'Ignore very suspicious pile that you should probably move.',
        nextText: 11.5,
      },
    ]
  },
  {
    id: 15,
    text: "As you search through the piles of fecal matter, you feel a change of texture at the tips of your fingers, You pull and tug, eventually gripping what feels like a wooden board.",
    options: [
      {
        setState: {pulling: true},
        text: 'Keep Pulling',
        nextText: 18,
      },
      {
        test: 'Give Up.',
        nextText: 11.5,
      },
    ]
  },
  {
    id: 16,
    text: "You move the piles of hay aside and discover a trap door, This probably leads to a wine-cellar or some sort of sewers, no better answer than finding out for yourself.",
    options: [
      {
        text: 'Jump down the trap door',
        nextText: 17,
      },
      {
        test: 'Continue searching the barn.',
        nextText: 4,
      },
    ]
  },
  {
    id: 17,
    text: "You jump down the trap door, your lantern goes out from the motion of you falling, you hit the ground and there you see 2 giant cathedral doors underneath the barn. What could it lead too?",
    options: [
      {
        text: 'Thank you for playing!',
        nextText: 1,
      }
    ]
  },
  {
    id: 18,
    text: "You pull out a crossbow that's indefinitely covered in shit. It's a shitty crossbow. surprise surprise.",
    options: [
      {
        text: 'Retreive and go back.',
        setState: {pulling: false, crossBow: true},
        nextText: 4,
      },
    ]

  },
  {
    id: 19,
    text: "You see cracks of lights eminating through some vines grown onto the side wall of the barn, adjacent to the vines is a discarded Broadsword.",
    options: [
      {
        text: 'Inspect Broadsword',
        requiredState: (currentState) => currentState.nobroadSword,
        setState: {inspecting: true, broadSword: true, nobroadSword: false},
        nextText: 20,
      },
      {
        requiredState: (currentState) => currentState.nobroadSword,
        text: 'Inspect Vines',
        nextText: 20.1,
      },
      {
        requiredState: (currentState) => currentState.broadSword,
        text: 'Inspect Vines',
        nextText: 21,
      },
    ]
  },
  {
    id: 19.1,
    text: "You see cracks of lights eminating through some vines grown onto the side wall of the barn, You've picked up the Broadsword that was once there.",
    options: [
      {
        requiredState: (currentState) => currentState.nobroadSword,
        text: 'Inspect Vines',
        nextText: 20.1,
      },
      {
        requiredState: (currentState) => currentState.broadSword,
        text: 'Inspect Vines',
        nextText: 21,
      },
    ]
  },
  {
    id: 20.1,
    text: "You step towards the vines and as you lean towards the cracks, you feel them wrap around your legs like you're the unfortunate victim of a hentai production. You try to tug your leg away but you end up falling onto the Broadsword you carelessly ignored and it impaled you, causing you to bleed out, right there, alone.",
    options: [
      {
        text: 'Play Again?',
        nextText: 1,
      }
    ]
  },
  {
    id: 20,
    text: "You pick up the Broadsword. Honestly, who just leaves those things laying around. Use it to cut things open I suppose..",
    options: [
      {
        setState: {broadSword: true},
        text: "Back to beginning",
        nextText: 4,
      },
      {
        setState: {broadSword: true},
        text: "Back to the vine room",
        nextText: 19.1,
      }
    ]
  },
  {
    id: 21,
    text: "You equip your Broadsword and hack through the vines, revealing an old window in the newly found room. You rush as quickly as possible to look out the window in hopes to discover your whereabouts. Upon your first gaze outside the window you are met with a overgrowth of trees. It calls for you, but do you call for it?",
    options: [
      {
        requiredState: (currentState) => currentState.broadSword,
        text: 'Thank you for playing!',
        nextText: 1,
      }
    ]
  },

]
startGame()