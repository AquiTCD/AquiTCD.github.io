import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html } from 'satori-html';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
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

    // Convert logo_w.svg to red PNG via Resvg (already a project dependency)
    const logoSvgRaw = readFileSync(resolve('./public/logo_w.svg'), 'utf-8');
    const logoSvgRed = logoSvgRaw.replace(/fill:white/g, 'fill:#e60012');
    const logoResvgInst = new Resvg(logoSvgRed, { fitTo: { mode: 'width', value: 300 } });
    const logoDataUrl = `data:image/png;base64,${Buffer.from(logoResvgInst.render().asPng()).toString('base64')}`;

    const [
      coopServerIconDataUrl,
      twitchIconDataUrl,
      discordServiceIconDataUrl,
      qrHitotsuyo,
      qrTwitch,
      qrAkiDiscord,
      qrDiscordCoop,
    ] = await Promise.all([
      toDataUrlFetch('https://cdn.discordapp.com/icons/1482369555664736366/de04f8e2d93e2815563172fb61ecc47e.png?size=256'),
      toDataUrlFetch('https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://twitch.tv&size=128'),
      toDataUrlFetch('https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://discord.com&size=128'),
      fetchQr('https://stronger-a-day.solunita.net', 130),
      fetchQr('https://www.twitch.tv/aquitcd', 80),
      fetchQr('https://discord.gg/9MNuzE5B2Z', 80),
      fetchQr('https://discord.gg/hduVYVbj3b', 80),
    ]);

    const bgDataUrl = toDataUrlFile(resolve('./public/roraima.jpg'), 'image/jpeg');
    const introRecipesDataUrl = toDataUrlFile(resolve('./public/intro_recipes.png'));
    const introSelectChallengesDataUrl = toDataUrlFile(resolve('./public/intro_select_challenges.png'));
    const akiIconDataUrl = toDataUrlFile(resolve('./public/iconA20.png'));

    const markup = html`
      <div style="display: flex; flex-direction: column; width: 1200px; height: 630px; background-color: #0a0a0a; font-family: 'Noto Sans JP'; position: relative; overflow: hidden;">

        <img src="${bgDataUrl}" width="1200" height="630" style="position: absolute; top: 0; left: 0; width: 1200px; height: 630px; object-fit: cover; opacity: 0.2; display: flex;" />
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(#e60012 1.5px, transparent 1.5px); background-size: 22px 22px; opacity: 0.45; display: flex;"></div>

        <!-- Name badge (top-left) -->
        <div style="display: flex; position: absolute; top: 26px; left: 40px;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; border: 3px solid #fff; box-shadow: 5px 5px 0px #fff; transform: skew(-8deg); display: flex;"></div>
          <div style="display: flex; font-size: 30px; font-weight: 900; color: #0a0a0a; padding: 6px 22px; font-family: 'NotoSans';">六角橋アキ / AquiTCD</div>
        </div>

        <!-- Works badge (top-right) -->
        <div style="display: flex; position: absolute; top: 26px; right: 40px;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0a0a0a; border: 3px solid #e60012; box-shadow: -5px 5px 0px #e60012; transform: skew(-8deg); display: flex;"></div>
          <div style="display: flex; font-size: 22px; font-weight: 900; color: #ffffff; padding: 5px 18px; font-family: 'NotoSans';">WORKS</div>
        </div>

        <!-- Main 2-column layout: top=96, bottom=32 → height=502px -->
        <div style="display: flex; flex-direction: row; position: absolute; top: 96px; left: 40px; right: 40px; bottom: 32px; gap: 24px;">

          <!-- ===== LEFT: Hitotsuyo ===== -->
          <div style="display: flex; position: relative; flex: 1;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0a0a0a; border: 5px solid #e60012; box-shadow: -8px 8px 0px #e60012; transform: skew(-3deg); display: flex;"></div>
            <div style="display: flex; flex-direction: column; padding: 18px 26px; width: 100%; color: #ffffff;">

              <!-- MAIN PROJECT label -->
              <div style="display: flex; position: relative; align-self: flex-start; margin-bottom: 6px;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; transform: skew(-8deg); display: flex;"></div>
                <div style="display: flex; font-size: 15px; font-weight: 900; color: #0a0a0a; padding: 3px 12px; font-family: 'NotoSans';">MAIN PROJECT</div>
              </div>

              <!-- Main row: [left content flex:1] | [right stacked images 96px] -->
              <!-- Images wrap around logo via shared row height -->
              <div style="display: flex; flex-direction: row; gap: 10px; flex: 1;">

                <!-- Left content column -->
                <div style="display: flex; flex-direction: column; flex: 1;">

                  <!-- Logo (300x80, from logo_w.svg → red PNG) -->
                  <img src="${logoDataUrl}" width="300" height="80" style="width: 300px; height: 80px; display: flex; margin-bottom: 8px;" />

                  <!-- Tagline: 1 line (saves vertical space vs 3-line) -->
                  <div style="display: flex; font-size: 38px; font-weight: 900; color: #ffffff; font-family: 'Noto Serif JP'; line-height: 1.1; margin-bottom: 6px;">1日ひとつ強くなる</div>

                  <!-- Description lines (flex:1 fills remaining space) -->
                  <div style="display: flex; flex-direction: column; flex: 1;">
                    <div style="display: flex; font-size: 28px; font-weight: 900; color: #cccccc; font-family: 'Noto Sans JP'; line-height: 1.3;">格ゲー上達を支援するWebアプリ</div>
                    <div style="display: flex; font-size: 28px; font-weight: 900; color: #cccccc; font-family: 'Noto Sans JP'; line-height: 1.3;">PDCAサポート・メモ・コンボ管理</div>
                    <div style="display: flex; font-size: 28px; font-weight: 900; color: #cccccc; font-family: 'Noto Sans JP'; line-height: 1.3;">PC・スマホ両対応</div>
                  </div>

                  <!-- Bottom: URL + QR -->
                  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 8px;">
                    <div style="display: flex; position: relative; align-self: flex-end;">
                      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; transform: skew(-8deg); display: flex;"></div>
                      <div style="display: flex; font-size: 20px; font-weight: 700; color: #fff; padding: 5px 16px; font-family: 'Noto Sans JP';">stronger-a-day.solunita.net</div>
                    </div>
                    <img src="${qrHitotsuyo}" width="130" height="130" style="width: 130px; height: 130px; display: flex; border: 4px solid #ffffff;" />
                  </div>

                </div>

                <!-- Right: 2 portrait images stacked vertically (96x208 each → total 424px ≈ row height) -->
                <div style="display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; width: 96px;">
                  <img src="${introRecipesDataUrl}" width="96" height="208" style="width: 96px; height: 208px; object-fit: cover; object-position: center top; display: flex; border: 3px solid #ffffff;" />
                  <img src="${introSelectChallengesDataUrl}" width="96" height="208" style="width: 96px; height: 208px; object-fit: cover; object-position: center top; display: flex; border: 3px solid #ffffff;" />
                </div>

              </div>

            </div>
          </div>

          <!-- ===== RIGHT: Twitch + A.K.I.研究所 + 社会人協力ゲーム組合 (width: 420px) ===== -->
          <div style="display: flex; flex-direction: column; width: 420px; gap: 16px;">

            <!-- Twitch (190px) — 赤背景 -->
            <div style="display: flex; position: relative; height: 190px;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e60012; border: 4px solid #ffffff; box-shadow: -6px 6px 0px #0a0a0a; transform: skew(-3deg); display: flex;"></div>
              <div style="display: flex; flex-direction: column; padding: 16px 18px; width: 100%;">
                <!-- Header: Twitch brand icon + TWITCH -->
                <div style="display: flex; flex-direction: row; align-items: center; gap: 10px; margin-bottom: 10px;">
                  <div style="display: flex; width: 38px; height: 38px; border-radius: 6px; overflow: hidden; flex-shrink: 0; border: 2px solid #ffffff;">
                    <img src="${twitchIconDataUrl}" width="38" height="38" style="width: 38px; height: 38px; object-fit: cover; display: flex;" />
                  </div>
                  <div style="display: flex; font-size: 38px; font-weight: 900; color: #ffffff; font-family: 'NotoSans'; line-height: 1;">TWITCH</div>
                </div>
                <!-- Body: text + QR 80px -->
                <div style="display: flex; flex-direction: row; gap: 10px; flex: 1; align-items: flex-start;">
                  <div style="display: flex; flex-direction: column; flex: 1; gap: 4px;">
                    <div style="display: flex; font-size: 26px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">AI相棒パルセラと</div>
                    <div style="display: flex; font-size: 26px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">お喋りしながら配信</div>
                    <div style="display: flex; font-size: 26px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">コメント大歓迎</div>
                  </div>
                  <img src="${qrTwitch}" width="80" height="80" style="width: 80px; height: 80px; display: flex; border: 3px solid #ffffff; flex-shrink: 0;" />
                </div>
              </div>
            </div>

            <!-- A.K.I.研究所 Discord (138px) — 黒ベース、COOPと同じカラー -->
            <div style="display: flex; position: relative; height: 138px;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0a0a0a; border: 4px solid #ffffff; box-shadow: -6px 6px 0px #e60012; transform: skew(-3deg); display: flex;"></div>
              <div style="display: flex; flex-direction: column; padding: 12px 18px; width: 100%;">
                <!-- Header: discord icon → server name → server icon -->
                <div style="display: flex; flex-direction: row; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <div style="display: flex; width: 20px; height: 20px; border-radius: 4px; overflow: hidden; flex-shrink: 0;">
                    <img src="${discordServiceIconDataUrl}" width="20" height="20" style="width: 20px; height: 20px; object-fit: cover; display: flex;" />
                  </div>
                  <div style="display: flex; font-size: 28px; font-weight: 900; color: #ffffff; font-family: 'NotoSans'; line-height: 1;">A.K.I.研究所</div>
                  <div style="display: flex; width: 28px; height: 28px; border-radius: 50%; overflow: hidden; border: 2px solid #ffffff; flex-shrink: 0;">
                    <img src="${akiIconDataUrl}" width="28" height="28" style="width: 28px; height: 28px; object-fit: cover; display: flex;" />
                  </div>
                </div>
                <!-- Body: description + QR 80px -->
                <div style="display: flex; flex-direction: row; gap: 8px; flex: 1; align-items: flex-start;">
                  <div style="display: flex; flex-direction: column; flex: 1; gap: 4px;">
                    <div style="display: flex; font-size: 24px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">SF6 A.K.I. の攻略</div>
                    <div style="display: flex; font-size: 24px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">交流サーバー運営中</div>
                  </div>
                  <img src="${qrAkiDiscord}" width="80" height="80" style="width: 80px; height: 80px; display: flex; border: 3px solid #ffffff; flex-shrink: 0;" />
                </div>
              </div>
            </div>

            <!-- 社会人協力ゲーム組合 Discord (flex:1 ≈ 142px) — 黒ベース -->
            <div style="display: flex; position: relative; flex: 1;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #0a0a0a; border: 4px solid #ffffff; box-shadow: -6px 6px 0px #e60012; transform: skew(-3deg); display: flex;"></div>
              <div style="display: flex; flex-direction: column; padding: 12px 18px; width: 100%;">
                <!-- Header: discord icon → server name → server icon -->
                <div style="display: flex; flex-direction: row; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <div style="display: flex; width: 20px; height: 20px; border-radius: 4px; overflow: hidden; flex-shrink: 0;">
                    <img src="${discordServiceIconDataUrl}" width="20" height="20" style="width: 20px; height: 20px; object-fit: cover; display: flex;" />
                  </div>
                  <div style="display: flex; font-size: 28px; font-weight: 900; color: #ffffff; font-family: 'NotoSans'; line-height: 1;">社会人協力ゲーム組合</div>
                  <div style="display: flex; width: 28px; height: 28px; border-radius: 50%; overflow: hidden; border: 2px solid #ffffff; flex-shrink: 0;">
                    <img src="${coopServerIconDataUrl}" width="28" height="28" style="width: 28px; height: 28px; object-fit: cover; display: flex;" />
                  </div>
                </div>
                <!-- Body: description + QR 80px -->
                <div style="display: flex; flex-direction: row; gap: 8px; flex: 1; align-items: flex-start;">
                  <div style="display: flex; flex-direction: column; flex: 1; gap: 4px;">
                    <div style="display: flex; font-size: 24px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">社会人でも協力ゲームに</div>
                    <div style="display: flex; font-size: 24px; font-weight: 900; color: #ffffff; font-family: 'Noto Sans JP'; line-height: 1.3;">ふらっと集まれるサーバー</div>
                  </div>
                  <img src="${qrDiscordCoop}" width="80" height="80" style="width: 80px; height: 80px; display: flex; border: 3px solid #ffffff; flex-shrink: 0;" />
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
