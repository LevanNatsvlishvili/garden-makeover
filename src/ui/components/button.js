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
  subText: 0x7ddf64,
  glow: 0xffd166,
};

const GLOW_RINGS = [
  { expand: 3, alpha: 0.45 },
  { expand: 7, alpha: 0.2 },
  { expand: 12, alpha: 0.08 },
];

export class UIButton extends Container {
  constructor({
    label,
    price,
    emoji,
    subText,
    onClick,
    condition,
    btnWidth = 130,
    btnSize = 'md',
  }) {
    super();

    this._btnWidth = btnWidth;
    this._btnHeight = BTN_HEIGHTS[btnSize] || BTN_HEIGHTS.md;
    this._enabled = true;
    this._hovered = false;
    this._glowOn = false;
    this._onClick = onClick;
    this._condition = condition;

    const h = this._btnHeight;
    const isLg = btnSize === 'lg';

    this._glow = new Graphics();
    this.addChild(this._glow);

    this._bg = new Graphics();
    this.addChild(this._bg);

    const hasPrice = price != null;
    this._hasSubText = subText != null;
    const hasSubText = hasPrice || this._hasSubText;

    this._label = new Text({
      text: `${emoji}  ${label}`,
      style: {
        fill: COLORS.text,
        fontSize: isLg ? 12 : 14,
        fontFamily: 'Segoe UI, Arial, sans-serif',
        fontWeight: '600',
      },
    });
    this._label.anchor.set(0.5);

    if (isLg && hasSubText) {
      this._label.position.set(this._btnWidth / 2, 14);
    } else if (hasPrice) {
      this._label.position.set(this._btnWidth / 2, h / 2 - 7);
    } else {
      this._label.position.set(this._btnWidth / 2, h / 2);
    }
    this.addChild(this._label);

    if (hasPrice) {
      this._price = new Text({
        text: `price: ${price}`,
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

    if (this._hasSubText) {
      this._subText = new Text({
        text: subText,
        style: {
          fill: COLORS.subText,
          fontSize: 10,
          fontFamily: 'Segoe UI, Arial, sans-serif',
        },
      });
      this._subText.anchor.set(0.5, 0.5);
      this._subText.position.set(this._btnWidth / 2, isLg ? 46 : h / 2 + 10);
      this.addChild(this._subText);
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

  setGlow(on) {
    this._glowOn = on;
    this._draw();
  }

  tickGlow() {
    if (!this._glowOn) return;
    this._drawGlow();
  }

  _drawGlow() {
    this._glow.clear();
    if (!this._glowOn) return;
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 120);
    for (const { expand, alpha } of GLOW_RINGS) {
      this._glow.roundRect(
        -expand,
        -expand,
        this._btnWidth + expand * 2,
        this._btnHeight + expand * 2,
        BTN_RADIUS + expand
      );
      this._glow.fill({ color: COLORS.glow, alpha: alpha * (0.55 + 0.45 * pulse) });
    }
  }

  _draw() {
    const bg = this._bg;
    const enabled = this._enabled;
    const hovered = this._hovered && enabled;

    const fill = !enabled ? COLORS.disabled : hovered ? COLORS.hover : COLORS.normal;
    const border = this._glowOn ? COLORS.glow : enabled ? COLORS.border : COLORS.borderDisabled;
    const borderAlpha = this._glowOn ? 0.9 : 0.4;

    this._drawGlow();

    bg.clear();
    bg.roundRect(0, 0, this._btnWidth, this._btnHeight, BTN_RADIUS);
    bg.fill({ color: fill, alpha: 0.9 });
    bg.stroke({ color: border, width: this._glowOn ? 1.5 : 1, alpha: borderAlpha });

    if (this._label) {
      this._label.style.fill = enabled ? COLORS.text : COLORS.textDisabled;
      this._label.x = this._btnWidth / 2;
    }
    if (this._price) {
      this._price.style.fill = enabled ? COLORS.price : COLORS.textDisabled;
      this._price.x = this._btnWidth / 2;
    }
    if (this._subText) {
      this._subText.style.fill = enabled ? COLORS.subText : COLORS.textDisabled;
      this._subText.x = this._btnWidth / 2;
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
