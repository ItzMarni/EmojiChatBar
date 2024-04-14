import Button from './gui/components/Button'; // Credits in file

const buttonsData = [
  '❤',
  // '🔥', Not supported on hyp
  '➜',
  '★',
  '☠',
  '⚠',
  '☀',
  '☺',
  '☹',
  '✉',
  '☂',
  '✘',
  '♪',
  '♬',
  '♩',
  '♫',
  '☄',
  '❀',
  '✿',
  '✦',
];

const buttonWidth = 12;
const buttonHeight = 12;

const margin = 4;

const startX =
  Renderer.screen.getWidth() - margin - buttonWidth * buttonsData.length - margin * (buttonsData.length - 1);
const startY = Renderer.screen.getHeight() - 30;

const emojiButtons = buttonsData.map((emoji, index) => {
  const buttonX = startX + (buttonWidth + margin) * index;
  const button = new Button(buttonX, startY, buttonWidth, buttonHeight, `§f${emoji}`);

  button.clicked = false;
  return button;
});

function renderButtons() {
  emojiButtons.forEach((button) => {
    if (button.clicked) {
      button.setWidth(buttonWidth * 0.9);
      button.setHeight(buttonHeight * 0.9);
    } else {
      button.setWidth(buttonWidth);
      button.setHeight(buttonHeight);
    }
    button.render(button.getX(), button.getY());
  });
}

function isInChat() {
  const chatGui = Client.currentGui.get();
  return (
    chatGui &&
    (chatGui.getClass().toGenericString() === 'public class net.minecraft.client.gui.GuiChat' ||
      chatGui.getClass().toGenericString() === 'public class net.optifine.gui.GuiChatOF')
  );
}

register('postGuiRender', () => {
  if (!Client.isInChat()) return;
  renderButtons();
});

register('guiMouseClick', (x, y, _mouseButton) => {
  if (!isInChat()) return;

  emojiButtons.forEach((button) => {
    if (
      x > button.getX() &&
      x < button.getX() + button.getWidth() &&
      y > button.getY() &&
      y < button.getY() + button.getHeight()
    ) {
      button.clicked = true;
      setTimeout(() => {
        button.clicked = false;
      }, 100);

      const chatGui = Client.currentGui.get();
      if (chatGui) {
        const chatInputField = chatGui.field_146415_a;
        const currentText = chatInputField.func_146179_b();
        const emoji = button.getText();

        chatInputField.func_146180_a(currentText + emoji);
      }
    }
  });
});
