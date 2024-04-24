import { Audio } from '../Audio';
import { HudColor, NotificationType } from '../enums';
import { Size, String } from '../utils';
import { Color, Vector2, Vector3 } from '@common/utils';
import { Notification } from './';

export abstract class Screen {
	public static get Resolution(): Size {
		const [width, height] = GetScreenActiveResolution();
		return new Size(width, height);
	}

	public static get ScaledResolution(): Size {
		const height = this.Height;
		return new Size(height * this.AspectRatio, height);
	}

	public static get Width(): number {
		return this.Resolution.width;
	}

	public static get ScaledWidth(): number {
		return this.Height * this.AspectRatio;
	}

	public static get Height(): number {
		return this.Resolution.height;
	}

	public static get AspectRatio(): number {
		return GetAspectRatio(false);
	}

	public static showSubtitle(message: string, duration = 2500): void {
		const strings: string[] = String.stringToArray(message);

		BeginTextCommandPrint('CELL_EMAIL_BCON');

		strings.forEach(element => {
			AddTextComponentSubstringPlayerName(element);
		});

		EndTextCommandPrint(duration, true);
	}

	public static displayHelpTextThisFrame(message: string): void {
		const strings: string[] = String.stringToArray(message);

		BeginTextCommandDisplayHelp('CELL_EMAIL_BCON');

		strings.forEach(element => {
			AddTextComponentSubstringPlayerName(element);
		});

		EndTextCommandDisplayHelp(0, false, false, -1);
	}

	public static showNotification(message: string, blinking = false): Notification {
		const strings: string[] = String.stringToArray(message);

		SetNotificationTextEntry('CELL_EMAIL_BCON');

		strings.forEach(element => {
			AddTextComponentSubstringPlayerName(element);
		});

		return new Notification(DrawNotification(blinking, true));
	}

	public static showAdvancedNotification(
		message: string,
		title: string,
		subtitle: string,
		iconSet: string,
		icon: string,
		bgColor: HudColor = HudColor.NONE,
		flashColor: Color = Color.empty,
		blinking = false,
		type: NotificationType = NotificationType.Default,
		showInBrief = true,
		sound = true,
	): Notification {
		const strings: string[] = String.stringToArray(message);

		SetNotificationTextEntry('CELL_EMAIL_BCON');

		strings.forEach(element => {
			AddTextComponentSubstringPlayerName(element);
		});

		if (bgColor !== HudColor.NONE) {
			SetNotificationBackgroundColor(Number(bgColor));
		}

		if (flashColor !== Color.empty && blinking) {
			SetNotificationFlashColor(flashColor.r, flashColor.g, flashColor.b, flashColor.a);
		}

		if (sound) {
			Audio.playSoundFrontEnd('DELETE', 'HUD_DEATHMATCH_SOUNDSET');
		}

		SetNotificationMessage(iconSet, icon, true, Number(type), title, subtitle);
		return new Notification(DrawNotification(blinking, showInBrief));
	}

	/**
	 * Converts world coordinates to screen coordinates
	 *
	 * @param position World position
	 * @param relative Set to true to make the coords returned in the range of 0-1
	 * @returns A table containing the screen coordinates and boolean if the coords are on screen.
	 */
	public static worldToScreen(position: Vector3, relative = false): [Vector2, boolean] {
		const [onScreen, x, y] = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
		return [
			new Vector2(x * (relative ? 1 : this.Width), y * (relative ? 1 : this.Height)),
			onScreen,
		];
	}
}
