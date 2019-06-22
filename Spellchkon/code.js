// Manage selection, for convinence
const nodeSelection = figma.currentPage.selection
const nodeFirstChild = figma.currentPage.selection["0"]

// Check if the node we are looking at is a TEXT node, only then showUI
if (nodeFirstChild.type === "TEXT") {
  // Loads the font name and style from selection. needed to write input back into .characters of a text node
  figma.loadFontAsync({ family: nodeFirstChild.fontName.family, style: nodeFirstChild.fontName.style})
  // Show plugin modal
  figma.showUI(__html__, {width: 360, height: 220})
  // Post the text layer .characters to the plugin modal
  figma.ui.postMessage(nodeFirstChild.characters)
}

// If node is not a TEXT node, fail gracefuly
if (nodeFirstChild.type !== "TEXT") {
  alert ("This not a text layer. Please select a text layer..")
  figma.closePlugin()
}

// If node selection is more than 1, fail gracefuly
if (nodeSelection.length !== 1) {
  alert ("Please select a single text layer.")
  figma.closePlugin()
}

// Message from UI containing the input string or cancels and closes the plugin
figma.ui.onmessage = (message) => {
  if (message.type === 'cancel') {
    figma.closePlugin()
  }
  if (message.trimString) {
    nodeFirstChild.characters = message.trimString
    figma.closePlugin()
  }
  
};
