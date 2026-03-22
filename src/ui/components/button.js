import { Container, Graphics, Text } from 'pixi.js';

export const BTN_HEIGHTS = { md: 46, lg: 62 };
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
  income: 0x7ddf64,
};

export class UIButton extends Container {
  constructor({ label, price, emoji, income, onClick, condition, btnWidth = 130, btnSize = 'md' }) {
    super();

    this._btnWidth = btnWidth;
    this._btnHeight = BTN_HEIGHTS[btnSize] || BTN_HEIGHTS.md;
    this._enabled = true;
    this._hovered = false;
    this._onClick = onClick;
    this._condition = condition;

    const h = this._btnHeight;
    const isLg = btnSize === 'lg';

    this._bg = new Graphics();
    this.addChild(this._bg);

    const hasPrice = price != null;
    this._hasIncome = income != null;
    const hasSubtext = hasPrice || this._hasIncome;

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

    if (isLg && hasSubtext) {
      this._label.position.set(this._btnWidth / 2, 14);
    } else if (hasPrice) {
      this._label.position.set(this._btnWidth / 2, h / 2 - 7);
    } else {
      this._label.position.set(this._btnWidth / 2, h / 2);
    }
    this.addChild(this._label);

    if (hasPrice) {
      this._price = new Text({
        text: `price ${price}`,
        style: {
          fill: COLORS.price,
          fontSize: 10,
          fontFamily: 'Segoe UI, Arial, sans-serif',
        },
      });
      this._price.anchor.set(0.5, 0.5);
      this._price.position.set(this._btnWidth / 2, isLg ? 30 : h / 2 + 10);
      this.addChild(this._price);
    }

    if (this._hasIncome) {
      this._income = new Text({
        text: `income ${income}`,
        style: {
          fill: COLORS.income,
          fontSize: 10,
          fontFamily: 'Segoe UI, Arial, sans-serif',
        },
      });
      this._income.anchor.set(0.5, 0.5);
      this._income.position.set(this._btnWidth / 2, isLg ? 46 : h / 2 + 10);
      this.addChild(this._income);
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
    bg.roundRect(0, 0, this._btnWidth, this._btnHeight, BTN_RADIUS);
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
    if (this._income) {
      this._income.style.fill = enabled ? COLORS.income : COLORS.textDisabled;
      this._income.x = this._btnWidth / 2;
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
