import { Container, Graphics, Text } from 'pixi.js';

const BTN_HEIGHT = 46;
const BTN_RADIUS = 8;

const COLORS = {
  normal: 0x2b2d42,
  hover: 0x3d405b,
  disabled: 0x1a1a2e,
  border: 0x8d99ae,
  borderDisabled: 0x444466,
  text: 0xedf2f4,
  textDisabled: 0x666688,
  price: 0xa8dadc,
};

export class UIButton extends Container {
  constructor({ label, price, emoji, onClick, condition, btnWidth = 130 }) {
    super();

    this._btnWidth = btnWidth;
    this._enabled = true;
    this._hovered = false;
    this._onClick = onClick;
    this._condition = condition;

    this._bg = new Graphics();
    this.addChild(this._bg);

    const hasPrice = price != null;

    this._label = new Text({
      text: `${emoji}  ${label}`,
      style: {
        fill: COLORS.text,
        fontSize: 14,
        fontFamily: 'Segoe UI, Arial, sans-serif',
        fontWeight: '600',
      },
    });
    this._label.anchor.set(0.5);
    this._label.position.set(this._btnWidth / 2, hasPrice ? BTN_HEIGHT / 2 - 7 : BTN_HEIGHT / 2);
    this.addChild(this._label);

    if (hasPrice) {
      this._price = new Text({
        text: `$ ${price}`,
        style: {
          fill: COLORS.price,
          fontSize: 11,
          fontFamily: 'Segoe UI, Arial, sans-serif',
        },
      });
      this._price.anchor.set(0.5);
      this._price.position.set(this._btnWidth / 2, BTN_HEIGHT / 2 + 10);
      this.addChild(this._price);
    }

    this._draw();

    this.eventMode = 'static';
    this.cursor = 'pointer';

    this.on('pointerover', () => {
      this._hovered = true;
      this._draw();
    });

    this.on('pointerout', () => {
      this._hovered = false;
      this._draw();
    });

    this.on('pointerdown', () => {
      if (this._enabled && this._onClick) this._onClick();
    });
  }

  _draw() {
    const bg = this._bg;
    const enabled = this._enabled;
    const hovered = this._hovered && enabled;

    const fill = !enabled ? COLORS.disabled : hovered ? COLORS.hover : COLORS.normal;
    const border = enabled ? COLORS.border : COLORS.borderDisabled;

    bg.clear();
    bg.roundRect(0, 0, this._btnWidth, BTN_HEIGHT, BTN_RADIUS);
    bg.fill({ color: fill, alpha: 0.9 });
    bg.stroke({ color: border, width: 1, alpha: 0.4 });

    if (this._label) {
      this._label.style.fill = enabled ? COLORS.text : COLORS.textDisabled;
      this._label.x = this._btnWidth / 2;
    }
    if (this._price) {
      this._price.style.fill = enabled ? COLORS.price : COLORS.textDisabled;
      this._price.x = this._btnWidth / 2;
    }

    this.alpha = enabled ? 1 : 0.55;
    this.cursor = enabled ? 'pointer' : 'default';
  }

  update() {
    if (!this._condition) return;
    const value = this._condition();
    if (this._enabled === value) return;
    this._enabled = value;
    this._draw();
  }
}
