import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html } from 'satori-html';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const loadFont = (path: string): ArrayBuffer => {
      const raw = readFileSync(resolve(path));
      return raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength) as ArrayBuffer;
    };

    const delaGothicData = loadFont('./public/fonts/DelaGothicOne-Regular.ttf');

    const [notoSansFile, notoSerifFile] = await Promise.all([
      fetch('https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf'),
      fetch('https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Serif/OTF/Japanese/NotoSerifCJKjp-Black.otf'),
    ]);
    if (!notoSansFile.ok) throw new Error(`Noto Sans fetch failed: ${notoSansFile.statusText}`);
    if (!notoSerifFile.ok) throw new Error(`Noto Serif fetch failed: ${notoSerifFile.statusText}`);
    const [notoSansData, notoSerifData] = await Promise.all([
      notoSansFile.arrayBuffer(),
      notoSerifFile.arrayBuffer(),
    ]);

    const toDataUrlFetch = async (url: string, mime = 'image/png'): Promise<string> => {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return `data:${mime};base64,${Buffer.from(buf).toString('base64')}`;
    };

    const toDataUrlFile = (filePath: string, mime = 'image/png'): string => {
      const buf = readFileSync(filePath);
      return `data:${mime};base64,${buf.toString('base64')}`;
    };

    const fetchQr = (url: string, size: number) =>
      toDataUrlFetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff`
      );

    const [discordIconDataUrl, qrHitotsuyo, qrTwitch, qrDiscord] = await Promise.all([
      toDataUrlFetch('https://cdn.discordapp.com/icons/1482369555664736366/de04f8e2d93e2815563172fb61ecc47e.png?size=256'),
      fetchQr('https://stronger-a-day.solunita.net', 130),
      fetchQr('https://www.twitch.tv/aquitcd', 140),
      fetchQr('https://discord.gg/hduVYVbj3b', 140),
    ]);

    const bgDataUrl = toDataUrlFile(resolve('./public/roraima.jpg'), 'image/jpeg');
    const screenshotDataUrl = toDataUrlFile(resolve('./public/screenshot_mobile.png'));

    const markup = html`
      <div style="display: flex; flex-direction: column; width: 1200px; height: 630px; background-color: #0a0a0a; font-family: 'Noto Sans JP'; position: relative; overflow: hidden;">

        <img src="${bgDataUrl}" width="1200" height="630" style="position: absolute; top: 0; left: 0; width: 1200px; height: 630px; object-fit: cover; opacity: 0.2; display: flex;" />
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(#e60012 1.5px, transparent 1.5px); background-size: 22px 22px; opacity: 0.45; display: flex;"></div>

        <!-- Name badge -->
        <div style="display: flex; position: absolute; top: 26px; left: 40px;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; border: 3px solid #fff; box-shadow: 5px 5px 0px #fff; transform: skew(-8deg); display: flex;"></div>
          <div style="display: flex; font-size: 30px; font-weight: 900; color: #fff; padding: 6px 22px; font-family: 'DelaGothic';">六角橋アキ / AquiTCD</div>
        </div>

        <!-- Main 2-column layout: top=96, bottom=32 → height=502px -->
        <div style="display: flex; flex-direction: row; position: absolute; top: 96px; left: 40px; right: 40px; bottom: 32px; gap: 24px;">

          <!-- ===== LEFT: Hitotsuyo ===== -->
          <!-- カード高さ 502px, padding 18px×2=36px, コンテンツ 466px -->
          <div style="display: flex; position: relative; flex: 1;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #ffffff; border: 5px solid #e60012; box-shadow: -8px 8px 0px #e60012; transform: skew(-3deg); display: flex;"></div>
            <div style="display: flex; flex-direction: column; padding: 18px 26px; width: 100%; color: #0a0a0a;">

              <!-- MAIN PROJECT label -->
              <div style="display: flex; position: relative; align-self: flex-start; margin-bottom: 4px;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0a0a0a; transform: skew(-8deg); display: flex;"></div>
                <div style="display: flex; font-size: 15px; font-weight: 900; color: #e60012; padding: 3px 12px; font-family: 'DelaGothic';">MAIN PROJECT</div>
              </div>

              <!-- Title 80px (96→80でスペース確保) -->
              <div style="display: flex; font-size: 80px; font-weight: 900; color: #e60012; line-height: 1; font-family: 'DelaGothic'; margin-bottom: 10px;">ヒトツヨ</div>

              <!-- Middle: [tagline+desc (flex:1)] | [screenshot] -->
              <!-- 466 - 26(label) - 90(title) - 140(bottom) = 210px available -->
              <div style="display: flex; flex-direction: row; gap: 16px; flex: 1; align-items: flex-start;">

                <!-- Left: 3-line serif tagline + Noto description -->
                <div style="display: flex; flex-direction: column; flex: 1; gap: 0px;">
                  <!-- Hitotsuyo tagline: 太い明朝体 40px, 3行 -->
                  <div style="display: flex; font-size: 40px; font-weight: 900; color: #0a0a0a; font-family: 'Noto Serif JP'; line-height: 1.1;">1日</div>
                  <div style="display: flex; font-size: 40px; font-weight: 900; color: #0a0a0a; font-family: 'Noto Serif JP'; line-height: 1.1;">ひとつ</div>
                  <div style="display: flex; font-size: 40px; font-weight: 900; color: #0a0a0a; font-family: 'Noto Serif JP'; line-height: 1.1; margin-bottom: 10px;">強くなる</div>
                  <!-- Web要約: Noto Sans, 22px, 2行 -->
                  <div style="display: flex; font-size: 20px; font-weight: 900; color: #333333; font-family: 'Noto Sans JP'; line-height: 1.4;">格ゲーの弱点・課題を可視化してプレイしながら記録。</div>
                  <div style="display: flex; font-size: 20px; font-weight: 900; color: #333333; font-family: 'Noto Sans JP'; line-height: 1.4; margin-top: 4px;">PDCAで1日ひとつ強くなれ！コンボレシピ管理もあり。</div>
                </div>

                <!-- Right: mobile screenshot -->
                <img src="${screenshotDataUrl}" width="130" height="148" style="width: 130px; height: 148px; object-fit: cover; object-position: center top; display: flex; border: 3px solid #0a0a0a; flex-shrink: 0;" />
              </div>

              <!-- Bottom: URL (Noto) + QR 130px -->
              <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px;">
                <div style="display: flex; position: relative; align-self: flex-end;">
                  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; transform: skew(-8deg); display: flex;"></div>
                  <div style="display: flex; font-size: 20px; font-weight: 700; color: #fff; padding: 5px 16px; font-family: 'Noto Sans JP';">stronger-a-day.solunita.net</div>
                </div>
                <img src="${qrHitotsuyo}" width="130" height="130" style="width: 130px; height: 130px; display: flex; border: 4px solid #0a0a0a;" />
              </div>

            </div>
          </div>

          <!-- ===== RIGHT: Twitch + Discord ===== -->
          <!-- 各カード高さ (502-18)/2 = 242px, padding 16px×2=32px, コンテンツ 210px -->
          <div style="display: flex; flex-direction: column; width: 390px; gap: 18px;">

            <!-- Twitch -->
            <div style="display: flex; position: relative; flex: 1;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0a0a0a; border: 4px solid #ffffff; box-shadow: -6px 6px 0px #e60012; transform: skew(-3deg); display: flex;"></div>
              <div style="display: flex; flex-direction: column; padding: 16px 18px; width: 100%;">
                <!-- Header -->
                <div style="display: flex; font-size: 38px; font-weight: 900; color: #e60012; font-family: 'DelaGothic'; line-height: 1; margin-bottom: 10px;">TWITCH</div>
                <!-- Body: [text flex:1] | [QR 140px] → テキスト左周り込み -->
                <!-- body = 210 - 48(header) = 162px -->
                <div style="display: flex; flex-direction: row; gap: 10px; flex: 1; align-items: flex-start;">
                  <div style="display: flex; flex-direction: column; flex: 1; gap: 6px;">
                    <!-- 20px Noto, text area ≈ 204px → max 10 CJK/line (10×20=200px) -->
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">格ゲー多め！毎日配信</div>
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">雑食ゲーマーとして</div>
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">AI相棒「パルセラ」と</div>
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">喋りながら配信！</div>
                  </div>
                  <img src="${qrTwitch}" width="140" height="140" style="width: 140px; height: 140px; display: flex; border: 3px solid #ffffff; flex-shrink: 0;" />
                </div>
              </div>
            </div>

            <!-- Discord -->
            <div style="display: flex; position: relative; flex: 1;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; border: 4px solid #ffffff; box-shadow: -6px 6px 0px #0a0a0a; transform: skew(-3deg); display: flex;"></div>
              <div style="display: flex; flex-direction: column; padding: 16px 18px; width: 100%;">
                <!-- Header with icon -->
                <div style="display: flex; flex-direction: row; align-items: center; gap: 10px; margin-bottom: 10px;">
                  <div style="display: flex; width: 38px; height: 38px; border-radius: 50%; overflow: hidden; border: 3px solid #ffffff; flex-shrink: 0;">
                    <img src="${discordIconDataUrl}" width="38" height="38" style="width: 38px; height: 38px; object-fit: cover; display: flex;" />
                  </div>
                  <div style="display: flex; font-size: 38px; font-weight: 900; color: #ffffff; font-family: 'DelaGothic'; line-height: 1;">DISCORD</div>
                </div>
                <!-- Body: [text flex:1] | [QR 140px] -->
                <div style="display: flex; flex-direction: row; gap: 10px; flex: 1; align-items: flex-start;">
                  <div style="display: flex; flex-direction: column; flex: 1; gap: 6px;">
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">社会人ゲーマーの</div>
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">協力プレイDiscord！</div>
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">PS/Switch/Xbox/PC</div>
                    <div style="display: flex; font-size: 20px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">なんでもOK！</div>
                  </div>
                  <img src="${qrDiscord}" width="140" height="140" style="width: 140px; height: 140px; display: flex; border: 3px solid #ffffff; flex-shrink: 0;" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    const svg = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'DelaGothic', data: delaGothicData, weight: 400, style: 'normal' },
        { name: 'DelaGothic', data: delaGothicData, weight: 700, style: 'normal' },
        { name: 'DelaGothic', data: delaGothicData, weight: 900, style: 'normal' },
        { name: 'Noto Serif JP', data: notoSerifData, weight: 900, style: 'normal' },
        { name: 'Noto Sans JP', data: notoSansData, weight: 700, style: 'normal' },
        { name: 'Noto Sans JP', data: notoSansData, weight: 900, style: 'normal' },
      ],
    });

    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
    const pngData = resvg.render().asPng();

    return new Response(pngData, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error: any) {
    console.error('OGP Generation Error:', error);
    return new Response(error.message || 'Failed to generate OGP image', { status: 500 });
  }
};
