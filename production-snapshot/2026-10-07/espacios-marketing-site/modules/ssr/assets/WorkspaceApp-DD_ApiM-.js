import { C as __commonJSMin, T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import Link from "./link-R7mqIJIC.js";
import { t as EspaciosLogo } from "./EspaciosLogo-28bELevs.js";
import { t as ThemeControl } from "./ThemeControl-Bm6QZOLR.js";
import { c as workspaceNavigation, n as createSurfaceHref, s as secondaryNavigation, t as classicSurfaceHref } from "./route-contract-DKMZR9ZL.js";
import { a as workspaceApiFetch, i as storedAccessToken, o as workspaceApiResponseFetch, r as startWorkspaceSessionMaintenance, s as workspaceAssistantReply, t as WorkspaceApiError } from "./workspace-client-C-s0XeLI.js";
import { r as mergeClasses, t as Icon } from "./Icon-CHj4xEMx.js";
//#endregion
//#region node_modules/vinext/dist/shims/image-config.js
var import_ipaddr = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root) {
		"use strict";
		const ipv4Part = "(0?\\d+|0x[a-f0-9]+)";
		const ipv4Regexes = {
			fourOctet: new RegExp(`^${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}$`, "i"),
			threeOctet: new RegExp(`^${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}$`, "i"),
			twoOctet: new RegExp(`^${ipv4Part}\\.${ipv4Part}$`, "i"),
			longValue: new RegExp(`^${ipv4Part}$`, "i")
		};
		const octalRegex = new RegExp(`^0[0-7]+$`, "i");
		const hexRegex = new RegExp(`^0x[a-f0-9]+$`, "i");
		const zoneIndex = "%[0-9a-z]{1,}";
		const ipv6Part = "(?:[0-9a-f]+::?)+";
		const ipv6Regexes = {
			zoneIndex: new RegExp(zoneIndex, "i"),
			"native": new RegExp(`^(::)?(${ipv6Part})?([0-9a-f]+)?(::)?(${zoneIndex})?$`, "i"),
			deprecatedTransitional: new RegExp(`^(?:::)(${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}(${zoneIndex})?)$`, "i"),
			transitional: new RegExp(`^((?:${ipv6Part})|(?:::)(?:${ipv6Part})?)${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}(${zoneIndex})?$`, "i")
		};
		function expandIPv6(string, parts) {
			if (string.indexOf("::") !== string.lastIndexOf("::")) return null;
			let colonCount = 0;
			let lastColon = -1;
			let zoneId = (string.match(ipv6Regexes.zoneIndex) || [])[0];
			let replacement, replacementCount;
			if (zoneId) {
				zoneId = zoneId.substring(1);
				string = string.replace(/%.+$/, "");
			}
			while ((lastColon = string.indexOf(":", lastColon + 1)) >= 0) colonCount++;
			if (string.substr(0, 2) === "::") colonCount--;
			if (string.substr(-2, 2) === "::") colonCount--;
			if (colonCount > parts) return null;
			replacementCount = parts - colonCount;
			replacement = ":";
			while (replacementCount--) replacement += "0:";
			string = string.replace("::", replacement);
			if (string[0] === ":") string = string.slice(1);
			if (string[string.length - 1] === ":") string = string.slice(0, -1);
			parts = (function() {
				const ref = string.split(":");
				const results = [];
				for (let i = 0; i < ref.length; i++) results.push(parseInt(ref[i], 16));
				return results;
			})();
			return {
				parts,
				zoneId
			};
		}
		function matchCIDR(first, second, partSize, cidrBits) {
			if (first.length !== second.length) throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
			let part = 0;
			let shift;
			while (cidrBits > 0) {
				shift = partSize - cidrBits;
				if (shift < 0) shift = 0;
				if (first[part] >> shift !== second[part] >> shift) return false;
				cidrBits -= partSize;
				part += 1;
			}
			return true;
		}
		function parseIntAuto(string) {
			if (hexRegex.test(string)) return parseInt(string, 16);
			if (string[0] === "0" && !isNaN(parseInt(string[1], 10))) {
				if (octalRegex.test(string)) return parseInt(string, 8);
				throw new Error(`ipaddr: cannot parse ${string} as octal`);
			}
			return parseInt(string, 10);
		}
		function padPart(part, length) {
			while (part.length < length) part = `0${part}`;
			return part;
		}
		const ipaddr = {};
		ipaddr.IPv4 = (function() {
			function IPv4(octets) {
				if (octets.length !== 4) throw new Error("ipaddr: ipv4 octet count should be 4");
				let i, octet;
				for (i = 0; i < octets.length; i++) {
					octet = octets[i];
					if (!(0 <= octet && octet <= 255)) throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
				}
				this.octets = octets;
			}
			IPv4.prototype.SpecialRanges = {
				unspecified: [[new IPv4([
					0,
					0,
					0,
					0
				]), 8]],
				broadcast: [[new IPv4([
					255,
					255,
					255,
					255
				]), 32]],
				multicast: [[new IPv4([
					224,
					0,
					0,
					0
				]), 4]],
				linkLocal: [[new IPv4([
					169,
					254,
					0,
					0
				]), 16]],
				loopback: [[new IPv4([
					127,
					0,
					0,
					0
				]), 8]],
				carrierGradeNat: [[new IPv4([
					100,
					64,
					0,
					0
				]), 10]],
				"private": [
					[new IPv4([
						10,
						0,
						0,
						0
					]), 8],
					[new IPv4([
						172,
						16,
						0,
						0
					]), 12],
					[new IPv4([
						192,
						168,
						0,
						0
					]), 16]
				],
				reserved: [
					[new IPv4([
						192,
						0,
						0,
						0
					]), 24],
					[new IPv4([
						192,
						0,
						2,
						0
					]), 24],
					[new IPv4([
						192,
						88,
						99,
						0
					]), 24],
					[new IPv4([
						198,
						18,
						0,
						0
					]), 15],
					[new IPv4([
						198,
						51,
						100,
						0
					]), 24],
					[new IPv4([
						203,
						0,
						113,
						0
					]), 24],
					[new IPv4([
						240,
						0,
						0,
						0
					]), 4]
				],
				as112: [[new IPv4([
					192,
					175,
					48,
					0
				]), 24], [new IPv4([
					192,
					31,
					196,
					0
				]), 24]],
				amt: [[new IPv4([
					192,
					52,
					193,
					0
				]), 24]]
			};
			IPv4.prototype.kind = function() {
				return "ipv4";
			};
			IPv4.prototype.match = function(other, cidrRange) {
				let ref;
				if (cidrRange === void 0) {
					ref = other;
					other = ref[0];
					cidrRange = ref[1];
				}
				if (other.kind() !== "ipv4") throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
				return matchCIDR(this.octets, other.octets, 8, cidrRange);
			};
			IPv4.prototype.prefixLengthFromSubnetMask = function() {
				let cidr = 0;
				let stop = false;
				const zerotable = {
					0: 8,
					128: 7,
					192: 6,
					224: 5,
					240: 4,
					248: 3,
					252: 2,
					254: 1,
					255: 0
				};
				let i, octet, zeros;
				for (i = 3; i >= 0; i -= 1) {
					octet = this.octets[i];
					if (octet in zerotable) {
						zeros = zerotable[octet];
						if (stop && zeros !== 0) return null;
						if (zeros !== 8) stop = true;
						cidr += zeros;
					} else return null;
				}
				return 32 - cidr;
			};
			IPv4.prototype.range = function() {
				return ipaddr.subnetMatch(this, this.SpecialRanges);
			};
			IPv4.prototype.toByteArray = function() {
				return this.octets.slice(0);
			};
			IPv4.prototype.toIPv4MappedAddress = function() {
				return ipaddr.IPv6.parse(`::ffff:${this.toString()}`);
			};
			IPv4.prototype.toNormalizedString = function() {
				return this.toString();
			};
			IPv4.prototype.toString = function() {
				return this.octets.join(".");
			};
			return IPv4;
		})();
		ipaddr.IPv4.broadcastAddressFromCIDR = function(string) {
			try {
				const cidr = this.parseCIDR(string);
				const ipInterfaceOctets = cidr[0].toByteArray();
				const subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				const octets = [];
				let i = 0;
				while (i < 4) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error("ipaddr: the address does not have IPv4 CIDR format");
			}
		};
		ipaddr.IPv4.isIPv4 = function(string) {
			return this.parser(string) !== null;
		};
		ipaddr.IPv4.isValid = function(string) {
			try {
				new this(this.parser(string));
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv4.isValidCIDR = function(string) {
			try {
				this.parseCIDR(string);
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv4.isValidFourPartDecimal = function(string) {
			if (ipaddr.IPv4.isValid(string) && string.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/)) return true;
			else return false;
		};
		ipaddr.IPv4.isValidCIDRFourPartDecimal = function(string) {
			const match = string.match(/^(.+)\/(\d+)$/);
			if (!ipaddr.IPv4.isValidCIDR(string) || !match) return false;
			return ipaddr.IPv4.isValidFourPartDecimal(match[1]);
		};
		ipaddr.IPv4.networkAddressFromCIDR = function(string) {
			let cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
			try {
				cidr = this.parseCIDR(string);
				ipInterfaceOctets = cidr[0].toByteArray();
				subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				octets = [];
				i = 0;
				while (i < 4) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error("ipaddr: the address does not have IPv4 CIDR format");
			}
		};
		ipaddr.IPv4.parse = function(string) {
			const parts = this.parser(string);
			if (parts === null) throw new Error("ipaddr: string is not formatted like an IPv4 Address");
			return new this(parts);
		};
		ipaddr.IPv4.parseCIDR = function(string) {
			let match;
			if (match = string.match(/^(.+)\/(\d+)$/)) {
				const maskLength = parseInt(match[2]);
				if (maskLength >= 0 && maskLength <= 32) {
					const parsed = [this.parse(match[1]), maskLength];
					Object.defineProperty(parsed, "toString", { value: function() {
						return this.join("/");
					} });
					return parsed;
				}
			}
			throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
		};
		ipaddr.IPv4.parser = function(string) {
			let match, part, value;
			if (match = string.match(ipv4Regexes.fourOctet)) return (function() {
				const ref = match.slice(1, 6);
				const results = [];
				for (let i = 0; i < ref.length; i++) {
					part = ref[i];
					results.push(parseIntAuto(part));
				}
				return results;
			})();
			else if (match = string.match(ipv4Regexes.longValue)) {
				value = parseIntAuto(match[1]);
				if (value > 4294967295 || value < 0) throw new Error("ipaddr: address outside defined range");
				return (function() {
					const results = [];
					let shift;
					for (shift = 0; shift <= 24; shift += 8) results.push(value >> shift & 255);
					return results;
				})().reverse();
			} else if (match = string.match(ipv4Regexes.twoOctet)) return (function() {
				const ref = match.slice(1, 4);
				const results = [];
				value = parseIntAuto(ref[1]);
				if (value > 16777215 || value < 0) throw new Error("ipaddr: address outside defined range");
				results.push(parseIntAuto(ref[0]));
				results.push(value >> 16 & 255);
				results.push(value >> 8 & 255);
				results.push(value & 255);
				return results;
			})();
			else if (match = string.match(ipv4Regexes.threeOctet)) return (function() {
				const ref = match.slice(1, 5);
				const results = [];
				value = parseIntAuto(ref[2]);
				if (value > 65535 || value < 0) throw new Error("ipaddr: address outside defined range");
				results.push(parseIntAuto(ref[0]));
				results.push(parseIntAuto(ref[1]));
				results.push(value >> 8 & 255);
				results.push(value & 255);
				return results;
			})();
			else return null;
		};
		ipaddr.IPv4.subnetMaskFromPrefixLength = function(prefix) {
			prefix = parseInt(prefix);
			if (prefix < 0 || prefix > 32) throw new Error("ipaddr: invalid IPv4 prefix length");
			const octets = [
				0,
				0,
				0,
				0
			];
			let j = 0;
			const filledOctetCount = Math.floor(prefix / 8);
			while (j < filledOctetCount) {
				octets[j] = 255;
				j++;
			}
			if (filledOctetCount < 4) octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - prefix % 8;
			return new this(octets);
		};
		ipaddr.IPv6 = (function() {
			function IPv6(parts, zoneId) {
				let i, part;
				if (parts.length === 16) {
					this.parts = [];
					for (i = 0; i <= 14; i += 2) this.parts.push(parts[i] << 8 | parts[i + 1]);
				} else if (parts.length === 8) this.parts = parts;
				else throw new Error("ipaddr: ipv6 part count should be 8 or 16");
				for (i = 0; i < this.parts.length; i++) {
					part = this.parts[i];
					if (!(0 <= part && part <= 65535)) throw new Error("ipaddr: ipv6 part should fit in 16 bits");
				}
				if (zoneId) this.zoneId = zoneId;
			}
			IPv6.prototype.SpecialRanges = {
				unspecified: [new IPv6([
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 128],
				linkLocal: [new IPv6([
					65152,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 10],
				multicast: [new IPv6([
					65280,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 8],
				loopback: [new IPv6([
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				]), 128],
				uniqueLocal: [new IPv6([
					64512,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 7],
				ipv4Mapped: [new IPv6([
					0,
					0,
					0,
					0,
					0,
					65535,
					0,
					0
				]), 96],
				deprecatedSiteLocal: [new IPv6([
					65216,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 10],
				discard: [new IPv6([
					256,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 64],
				rfc6145: [new IPv6([
					0,
					0,
					0,
					0,
					65535,
					0,
					0,
					0
				]), 96],
				rfc6052: [[new IPv6([
					100,
					65435,
					0,
					0,
					0,
					0,
					0,
					0
				]), 96], [new IPv6([
					100,
					65435,
					1,
					0,
					0,
					0,
					0,
					0
				]), 48]],
				"6to4": [new IPv6([
					8194,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 16],
				teredo: [new IPv6([
					8193,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 32],
				benchmarking: [new IPv6([
					8193,
					2,
					0,
					0,
					0,
					0,
					0,
					0
				]), 48],
				amt: [new IPv6([
					8193,
					3,
					0,
					0,
					0,
					0,
					0,
					0
				]), 32],
				as112v6: [[new IPv6([
					8193,
					4,
					274,
					0,
					0,
					0,
					0,
					0
				]), 48], [new IPv6([
					9760,
					79,
					32768,
					0,
					0,
					0,
					0,
					0
				]), 48]],
				deprecatedOrchid: [new IPv6([
					8193,
					16,
					0,
					0,
					0,
					0,
					0,
					0
				]), 28],
				orchid2: [new IPv6([
					8193,
					32,
					0,
					0,
					0,
					0,
					0,
					0
				]), 28],
				droneRemoteIdProtocolEntityTags: [new IPv6([
					8193,
					48,
					0,
					0,
					0,
					0,
					0,
					0
				]), 28],
				segmentRouting: [new IPv6([
					24320,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]), 16],
				reserved: [
					[new IPv6([
						8193,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]), 23],
					[new IPv6([
						8193,
						3512,
						0,
						0,
						0,
						0,
						0,
						0
					]), 32],
					[new IPv6([
						16383,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]), 20]
				]
			};
			IPv6.prototype.isIPv4MappedAddress = function() {
				return this.range() === "ipv4Mapped";
			};
			IPv6.prototype.kind = function() {
				return "ipv6";
			};
			IPv6.prototype.match = function(other, cidrRange) {
				let ref;
				if (cidrRange === void 0) {
					ref = other;
					other = ref[0];
					cidrRange = ref[1];
				}
				if (other.kind() !== "ipv6") throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
				return matchCIDR(this.parts, other.parts, 16, cidrRange);
			};
			IPv6.prototype.prefixLengthFromSubnetMask = function() {
				let cidr = 0;
				let stop = false;
				const zerotable = {
					0: 16,
					32768: 15,
					49152: 14,
					57344: 13,
					61440: 12,
					63488: 11,
					64512: 10,
					65024: 9,
					65280: 8,
					65408: 7,
					65472: 6,
					65504: 5,
					65520: 4,
					65528: 3,
					65532: 2,
					65534: 1,
					65535: 0
				};
				let part, zeros;
				for (let i = 7; i >= 0; i -= 1) {
					part = this.parts[i];
					if (part in zerotable) {
						zeros = zerotable[part];
						if (stop && zeros !== 0) return null;
						if (zeros !== 16) stop = true;
						cidr += zeros;
					} else return null;
				}
				return 128 - cidr;
			};
			IPv6.prototype.range = function() {
				return ipaddr.subnetMatch(this, this.SpecialRanges);
			};
			IPv6.prototype.toByteArray = function() {
				let part;
				const bytes = [];
				const ref = this.parts;
				for (let i = 0; i < ref.length; i++) {
					part = ref[i];
					bytes.push(part >> 8);
					bytes.push(part & 255);
				}
				return bytes;
			};
			IPv6.prototype.toFixedLengthString = function() {
				const addr = (function() {
					const results = [];
					for (let i = 0; i < this.parts.length; i++) results.push(padPart(this.parts[i].toString(16), 4));
					return results;
				}).call(this).join(":");
				let suffix = "";
				if (this.zoneId) suffix = `%${this.zoneId}`;
				return addr + suffix;
			};
			IPv6.prototype.toIPv4Address = function() {
				if (!this.isIPv4MappedAddress()) throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
				const ref = this.parts.slice(-2);
				const high = ref[0];
				const low = ref[1];
				return new ipaddr.IPv4([
					high >> 8,
					high & 255,
					low >> 8,
					low & 255
				]);
			};
			IPv6.prototype.toNormalizedString = function() {
				const addr = (function() {
					const results = [];
					for (let i = 0; i < this.parts.length; i++) results.push(this.parts[i].toString(16));
					return results;
				}).call(this).join(":");
				let suffix = "";
				if (this.zoneId) suffix = `%${this.zoneId}`;
				return addr + suffix;
			};
			IPv6.prototype.toRFC5952String = function() {
				const regex = /((^|:)(0(:|$)){2,})/g;
				const string = this.toNormalizedString();
				let bestMatchIndex = 0;
				let bestMatchLength = -1;
				let match;
				while (match = regex.exec(string)) if (match[0].length > bestMatchLength) {
					bestMatchIndex = match.index;
					bestMatchLength = match[0].length;
				}
				if (bestMatchLength < 0) return string;
				return `${string.substring(0, bestMatchIndex)}::${string.substring(bestMatchIndex + bestMatchLength)}`;
			};
			IPv6.prototype.toString = function() {
				return this.toRFC5952String();
			};
			return IPv6;
		})();
		ipaddr.IPv6.broadcastAddressFromCIDR = function(string) {
			try {
				const cidr = this.parseCIDR(string);
				const ipInterfaceOctets = cidr[0].toByteArray();
				const subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				const octets = [];
				let i = 0;
				while (i < 16) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`);
			}
		};
		ipaddr.IPv6.isIPv6 = function(string) {
			return this.parser(string) !== null;
		};
		ipaddr.IPv6.isValid = function(string) {
			if (typeof string === "string" && string.indexOf(":") === -1) return false;
			try {
				const addr = this.parser(string);
				new this(addr.parts, addr.zoneId);
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv6.isValidCIDR = function(string) {
			if (typeof string === "string" && string.indexOf(":") === -1) return false;
			try {
				this.parseCIDR(string);
				return true;
			} catch (e) {
				return false;
			}
		};
		ipaddr.IPv6.networkAddressFromCIDR = function(string) {
			let cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
			try {
				cidr = this.parseCIDR(string);
				ipInterfaceOctets = cidr[0].toByteArray();
				subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
				octets = [];
				i = 0;
				while (i < 16) {
					octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
					i++;
				}
				return new this(octets);
			} catch (e) {
				throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`);
			}
		};
		ipaddr.IPv6.parse = function(string) {
			const addr = this.parser(string);
			if (addr.parts === null) throw new Error("ipaddr: string is not formatted like an IPv6 Address");
			return new this(addr.parts, addr.zoneId);
		};
		ipaddr.IPv6.parseCIDR = function(string) {
			let maskLength, match, parsed;
			if (match = string.match(/^(.+)\/(\d+)$/)) {
				maskLength = parseInt(match[2]);
				if (maskLength >= 0 && maskLength <= 128) {
					parsed = [this.parse(match[1]), maskLength];
					Object.defineProperty(parsed, "toString", { value: function() {
						return this.join("/");
					} });
					return parsed;
				}
			}
			throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
		};
		ipaddr.IPv6.parser = function(string) {
			let addr, i, match, octet, octets, zoneId;
			if (match = string.match(ipv6Regexes.deprecatedTransitional)) return this.parser(`::ffff:${match[1]}`);
			if (ipv6Regexes.native.test(string)) return expandIPv6(string, 8);
			if (match = string.match(ipv6Regexes.transitional)) {
				zoneId = match[6] || "";
				addr = match[1];
				if (!match[1].endsWith("::")) addr = addr.slice(0, -1);
				addr = expandIPv6(addr + zoneId, 6);
				if (addr.parts) {
					octets = [
						parseInt(match[2]),
						parseInt(match[3]),
						parseInt(match[4]),
						parseInt(match[5])
					];
					for (i = 0; i < octets.length; i++) {
						octet = octets[i];
						if (!(0 <= octet && octet <= 255)) return null;
					}
					addr.parts.push(octets[0] << 8 | octets[1]);
					addr.parts.push(octets[2] << 8 | octets[3]);
					return {
						parts: addr.parts,
						zoneId: addr.zoneId
					};
				}
			}
			return null;
		};
		ipaddr.IPv6.subnetMaskFromPrefixLength = function(prefix) {
			prefix = parseInt(prefix);
			if (prefix < 0 || prefix > 128) throw new Error("ipaddr: invalid IPv6 prefix length");
			const octets = [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			let j = 0;
			const filledOctetCount = Math.floor(prefix / 8);
			while (j < filledOctetCount) {
				octets[j] = 255;
				j++;
			}
			if (filledOctetCount < 16) octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - prefix % 8;
			return new this(octets);
		};
		ipaddr.fromByteArray = function(bytes) {
			const length = bytes.length;
			if (length === 4) return new ipaddr.IPv4(bytes);
			else if (length === 16) return new ipaddr.IPv6(bytes);
			else throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
		};
		ipaddr.isValid = function(string) {
			return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
		};
		ipaddr.isValidCIDR = function(string) {
			return ipaddr.IPv6.isValidCIDR(string) || ipaddr.IPv4.isValidCIDR(string);
		};
		ipaddr.parse = function(string) {
			if (ipaddr.IPv6.isValid(string)) return ipaddr.IPv6.parse(string);
			else if (ipaddr.IPv4.isValid(string)) return ipaddr.IPv4.parse(string);
			else throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
		};
		ipaddr.parseCIDR = function(string) {
			try {
				return ipaddr.IPv6.parseCIDR(string);
			} catch (e) {
				try {
					return ipaddr.IPv4.parseCIDR(string);
				} catch (e2) {
					throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
				}
			}
		};
		ipaddr.process = function(string) {
			const addr = this.parse(string);
			if (addr.kind() === "ipv6" && addr.isIPv4MappedAddress()) return addr.toIPv4Address();
			else return addr;
		};
		ipaddr.subnetMatch = function(address, rangeList, defaultName) {
			let i, rangeName, rangeSubnets, subnet;
			if (defaultName === void 0 || defaultName === null) defaultName = "unicast";
			for (rangeName in rangeList) if (Object.prototype.hasOwnProperty.call(rangeList, rangeName)) {
				rangeSubnets = rangeList[rangeName];
				if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) rangeSubnets = [rangeSubnets];
				for (i = 0; i < rangeSubnets.length; i++) {
					subnet = rangeSubnets[i];
					if (address.kind() === subnet[0].kind() && address.match.apply(address, subnet)) return rangeName;
				}
			}
			return defaultName;
		};
		if (typeof module !== "undefined" && module.exports) module.exports = ipaddr;
		else root.ipaddr = ipaddr;
	})(exports);
})))(), 1);
/**
* Convert a glob pattern (with `*` and `**`) to a RegExp.
*
* For hostnames, segments are separated by `.`:
*   - `*` matches a single segment (no dots): [^.]+
*   - `**` matches any number of segments: .+
*
* For pathnames, segments are separated by `/`:
*   - `*` matches a single segment (no slashes): [^/]+
*   - `**` matches any number of segments (including empty): .*
*
* Literal characters are escaped for regex safety.
*/
function globToRegex(pattern, separator) {
	let regexStr = "^";
	const doubleStar = separator === "." ? ".+" : ".*";
	const singleStar = separator === "." ? "[^.]+" : "[^/]+";
	const parts = pattern.split("**");
	for (let i = 0; i < parts.length; i++) {
		if (i > 0) regexStr += doubleStar;
		const subParts = parts[i].split("*");
		for (let j = 0; j < subParts.length; j++) {
			if (j > 0) regexStr += singleStar;
			regexStr += subParts[j].replace(/[.+?^${}()|[\]\\]/g, "\\$&");
		}
	}
	regexStr += "$";
	return new RegExp(regexStr);
}
/**
* Check whether a URL matches a single remote pattern.
* Follows the same semantics as Next.js's matchRemotePattern().
*/
function matchRemotePattern(pattern, url) {
	if (pattern.protocol !== void 0) {
		if (pattern.protocol.replace(/:$/, "") !== url.protocol.replace(/:$/, "")) return false;
	}
	if (pattern.port !== void 0) {
		if (pattern.port !== url.port) return false;
	}
	if (!globToRegex(pattern.hostname, ".").test(url.hostname)) return false;
	if (pattern.search !== void 0) {
		if (pattern.search !== url.search) return false;
	}
	if (!globToRegex(pattern.pathname ?? "**", "/").test(url.pathname)) return false;
	return true;
}
/**
* Check whether a URL matches any configured remote pattern or legacy domain.
*/
function hasRemoteMatch(domains, remotePatterns, url) {
	return domains.some((domain) => url.hostname === domain) || remotePatterns.some((p) => matchRemotePattern(p, url));
}
/**
* Determine whether a string is a private (non-routable) IP address.
* Works for IPv4 and IPv6, including bracketed and IPv4-mapped forms.
*
* Uses ipaddr.js with range() !== 'unicast' — the same approach Next.js
* takes (via packages/next/src/server/is-private-ip.ts). This covers all
* IETF non-unicast ranges (CGNAT, benchmarking, multicast, reserved,
* teredo, documentation, discard, NAT64, etc.) without hand-rolling CIDR
* prefix checks that are easy to get wrong.
*
* https://github.com/vercel/next.js/blob/canary/packages/next/src/server/is-private-ip.ts
*/
function isPrivateIp(ip) {
	if (ip.startsWith("[") && ip.endsWith("]")) ip = ip.slice(1, -1);
	try {
		const parsed = import_ipaddr.default.parse(ip);
		if (parsed instanceof import_ipaddr.default.IPv6 && parsed.isIPv4MappedAddress()) return parsed.toIPv4Address().range() !== "unicast";
		return parsed.range() !== "unicast";
	} catch {
		return false;
	}
}
//#endregion
//#region node_modules/vinext/dist/shims/use-merged-ref.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useMergedRef(refA, refB) {
	const cleanupA = (0, import_react.useRef)(null);
	const cleanupB = (0, import_react.useRef)(null);
	return (0, import_react.useCallback)((current) => {
		if (current === null) {
			const cleanupFnA = cleanupA.current;
			if (cleanupFnA) {
				cleanupA.current = null;
				cleanupFnA();
			}
			const cleanupFnB = cleanupB.current;
			if (cleanupFnB) {
				cleanupB.current = null;
				cleanupFnB();
			}
		} else {
			if (refA) cleanupA.current = applyRef(refA, current);
			if (refB) cleanupB.current = applyRef(refB, current);
		}
	}, [refA, refB]);
}
function applyRef(refA, current) {
	if (typeof refA === "function") {
		const cleanup = refA(current);
		if (typeof cleanup === "function") return cleanup;
		else return () => refA(null);
	} else {
		refA.current = current;
		return () => {
			refA.current = null;
		};
	}
}
//#endregion
//#region node_modules/@unpic/react/dist/chunk-VTEFGNYT.mjs
var import_jsx_runtime = require_jsx_runtime();
var nestedKeys = /* @__PURE__ */ new Set(["style"]);
var fixedMap = {
	srcset: "srcSet",
	fetchpriority: "use" in import_react ? "fetchPriority" : "fetchpriority"
};
var camelize = (key) => {
	if (key.startsWith("data-") || key.startsWith("aria-")) return key;
	return fixedMap[key] || key.replace(/-./g, (suffix) => suffix[1].toUpperCase());
};
function camelizeProps(props) {
	return Object.fromEntries(Object.entries(props).map(([k, v]) => [camelize(k), nestedKeys.has(k) && v && typeof v !== "string" ? camelizeProps(v) : v]));
}
//#endregion
//#region node_modules/@unpic/core/dist/chunk-7DG3H6KO.mjs
var getSizes = (width, layout) => {
	if (!width || !layout) return;
	switch (layout) {
		case `constrained`: return `(min-width: ${width}px) ${width}px, 100vw`;
		case `fixed`: return `${width}px`;
		case `fullWidth`: return `100vw`;
		default: return;
	}
};
var pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
var getStyle = ({ width, height, aspectRatio, layout, objectFit = "cover", background }) => {
	const styleEntries = [["object-fit", objectFit]];
	if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:") || background?.startsWith("/")) {
		styleEntries.push(["background-image", `url(${background})`]);
		styleEntries.push(["background-size", "cover"]);
		styleEntries.push(["background-repeat", "no-repeat"]);
	} else styleEntries.push(["background", background]);
	if (layout === "fixed") {
		styleEntries.push(["width", pixelate(width)]);
		styleEntries.push(["height", pixelate(height)]);
	}
	if (layout === "constrained") {
		styleEntries.push(["max-width", pixelate(width)]);
		styleEntries.push(["max-height", pixelate(height)]);
		styleEntries.push(["aspect-ratio", aspectRatio ? `${aspectRatio}` : void 0]);
		styleEntries.push(["width", "100%"]);
	}
	if (layout === "fullWidth") {
		styleEntries.push(["width", "100%"]);
		styleEntries.push(["aspect-ratio", aspectRatio ? `${aspectRatio}` : void 0]);
		styleEntries.push(["height", pixelate(height)]);
	}
	return Object.fromEntries(styleEntries.filter(([, value]) => value));
};
var DEFAULT_RESOLUTIONS = [
	6016,
	5120,
	4480,
	3840,
	3200,
	2560,
	2048,
	1920,
	1668,
	1280,
	1080,
	960,
	828,
	750,
	640
];
var LOW_RES_WIDTH = 24;
var getBreakpoints = ({ width, layout, resolutions = DEFAULT_RESOLUTIONS }) => {
	if (layout === "fullWidth") return resolutions;
	if (!width) return [];
	const doubleWidth = width * 2;
	if (layout === "fixed") return [width, doubleWidth];
	if (layout === "constrained") return [
		width,
		doubleWidth,
		...resolutions.filter((w) => w < doubleWidth)
	];
	return [];
};
var getSrcSetEntries = ({ src, width, layout = "constrained", height, aspectRatio, breakpoints, format }) => {
	breakpoints ||= getBreakpoints({
		width,
		layout
	});
	return breakpoints.sort((a, b) => a - b).map((bp) => {
		let transformedHeight;
		if (height && aspectRatio) transformedHeight = Math.round(bp / aspectRatio);
		return {
			url: src,
			width: bp,
			height: transformedHeight,
			format
		};
	});
};
var getSrcSet = (options) => {
	let { src, transformer, operations } = options;
	if (!transformer) return "";
	return getSrcSetEntries(options).map(({ url: _, ...transform }) => {
		return `${transformer(src, {
			...operations,
			...transform
		}, options.options)?.toString()} ${transform.width}w`;
	}).join(",\n");
};
function transformSharedProps({ width, height, priority, layout = "constrained", aspectRatio, ...props }) {
	width = width && Number(width) || void 0;
	height = height && Number(height) || void 0;
	if (priority) {
		props.loading ||= "eager";
		props.fetchpriority ||= "high";
	} else {
		props.loading ||= "lazy";
		props.decoding ||= "async";
	}
	if (props.alt === "") props.role ||= "presentation";
	if (aspectRatio) {
		if (width) if (height) {} else height = Math.round(width / aspectRatio);
		else if (height) width = Math.round(height * aspectRatio);
		else if (layout !== "fullWidth") {}
	} else if (width && height) aspectRatio = width / height;
	else if (layout !== "fullWidth") {}
	return {
		width,
		height,
		aspectRatio,
		layout,
		...props
	};
}
function transformBaseImageProps(props) {
	let { src, transformer, background, layout, objectFit, breakpoints, width, height, aspectRatio, unstyled, operations, options, ...transformedProps } = transformSharedProps(props);
	if (transformer && background === "auto") {
		const lowResHeight = aspectRatio ? Math.round(LOW_RES_WIDTH / aspectRatio) : void 0;
		const lowResImage = transformer(src, {
			width: LOW_RES_WIDTH,
			height: lowResHeight
		}, options);
		if (lowResImage) background = lowResImage.toString();
	}
	const styleProps = {
		width,
		height,
		aspectRatio,
		layout,
		objectFit,
		background
	};
	transformedProps.sizes ||= getSizes(width, layout);
	if (!unstyled) transformedProps.style = {
		...getStyle(styleProps),
		...transformedProps.style
	};
	if (transformer) {
		transformedProps.srcset = getSrcSet({
			src,
			width,
			height,
			aspectRatio,
			layout,
			breakpoints,
			transformer,
			operations,
			options
		});
		const transformed = transformer(src, {
			...operations,
			width,
			height
		}, options);
		if (transformed) src = transformed;
		if (layout === "fullWidth" || layout === "constrained") {
			width = void 0;
			height = void 0;
		}
	}
	return {
		...transformedProps,
		src: src?.toString(),
		width,
		height
	};
}
function normalizeImageType(type) {
	if (!type) return {};
	if (type.startsWith("image/")) return {
		format: type.slice(6),
		mimeType: type
	};
	return {
		format: type,
		mimeType: `image/${type === "jpg" ? "jpeg" : type}`
	};
}
function transformBaseSourceProps({ media, type, ...props }) {
	let { src, transformer, layout, breakpoints, width, height, aspectRatio, sizes, loading, decoding, operations, options, ...rest } = transformSharedProps(props);
	if (!transformer) return {};
	const { format, mimeType } = normalizeImageType(type);
	sizes ||= getSizes(width, layout);
	const srcset = getSrcSet({
		src,
		width,
		height,
		aspectRatio,
		layout,
		breakpoints,
		transformer,
		format,
		operations,
		options
	});
	const transformed = transformer(src, {
		...operations,
		width,
		height
	}, options);
	if (transformed) src = transformed;
	const returnObject = {
		...rest,
		sizes,
		srcset
	};
	if (media) returnObject.media = media;
	if (mimeType) returnObject.type = mimeType;
	return returnObject;
}
//#endregion
//#region node_modules/unpic/esm/data/domains.js
var domains_default = {
	"images.ctfassets.net": "contentful",
	"cdn.builder.io": "builder.io",
	"images.prismic.io": "imgix",
	"www.datocms-assets.com": "imgix",
	"cdn.sanity.io": "imgix",
	"images.unsplash.com": "imgix",
	"cdn.shopify.com": "shopify",
	"s7d1.scene7.com": "scene7",
	"ip.keycdn.com": "keycdn",
	"assets.caisy.io": "bunny",
	"images.contentstack.io": "contentstack",
	"ucarecdn.com": "uploadcare",
	"imagedelivery.net": "cloudflare_images",
	"wsrv.nl": "wsrv"
};
//#endregion
//#region node_modules/unpic/esm/data/subdomains.js
var subdomains_default = {
	"imgix.net": "imgix",
	"wp.com": "wordpress",
	"files.wordpress.com": "wordpress",
	"b-cdn.net": "bunny",
	"storyblok.com": "storyblok",
	"kc-usercontent.com": "kontent.ai",
	"cloudinary.com": "cloudinary",
	"kxcdn.com": "keycdn",
	"imgeng.in": "imageengine",
	"imagekit.io": "imagekit",
	"cloudimg.io": "cloudimage",
	"ucarecdn.com": "uploadcare",
	"supabase.co": "supabase",
	"graphassets.com": "hygraph"
};
//#endregion
//#region node_modules/unpic/esm/data/paths.js
var paths_default = {
	"/cdn-cgi/image/": "cloudflare",
	"/cdn-cgi/imagedelivery/": "cloudflare_images",
	"/_next/image": "nextjs",
	"/_vercel/image": "vercel",
	"/is/image": "scene7",
	"/_ipx/": "ipx",
	"/_image": "astro",
	"/.netlify/images": "netlify",
	"/storage/v1/object/public/": "supabase",
	"/storage/v1/render/image/public/": "supabase",
	"/v1/storage/buckets/": "appwrite"
};
//#endregion
//#region node_modules/unpic/esm/src/utils.js
function roundIfNumeric(value) {
	if (!value) return value;
	const num = Number(value);
	if (isNaN(num)) return value;
	return Math.round(num);
}
/**
* Given a URL object, returns path and query params
*/
var toRelativeUrl = (url) => {
	const { pathname, search } = url;
	return `${pathname}${search}`;
};
/**
* Returns a URL string that may be relative or absolute
*/
var toCanonicalUrlString = (url) => {
	return url.hostname === "n" ? toRelativeUrl(url) : url.toString();
};
/**
* Normalises a URL object or string URL to a URL object.
*/
var toUrl = (url, base) => {
	return typeof url === "string" ? new URL(url, base ?? "http://n/") : url;
};
/**
* Escapes a string, even if it's URL-safe
*/
var escapeChar = (text) => text === " " ? "+" : "%" + text.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
var stripLeadingSlash = (str) => str?.startsWith("/") ? str.slice(1) : str;
var stripTrailingSlash = (str) => str?.endsWith("/") ? str.slice(0, -1) : str;
var addTrailingSlash = (str) => str?.endsWith("/") ? str : `${str}/`;
/**
* Creates a formatter given an operation joiner and key/value joiner
*/
var createFormatter = (kvSeparator, paramSeparator) => {
	const encodedValueJoiner = escapeChar(kvSeparator);
	const encodedOperationJoiner = escapeChar(paramSeparator);
	function escape(value) {
		return encodeURIComponent(value).replaceAll(kvSeparator, encodedValueJoiner).replaceAll(paramSeparator, encodedOperationJoiner);
	}
	function format(key, value) {
		return `${escape(key)}${kvSeparator}${escape(String(value))}`;
	}
	return (operations) => {
		return (Array.isArray(operations) ? operations : Object.entries(operations)).flatMap(([key, value]) => {
			if (value === void 0 || value === null) return [];
			if (Array.isArray(value)) return value.map((v) => format(key, v));
			return format(key, value);
		}).join(paramSeparator);
	};
};
/**
* Creates a parser given an operation joiner and key/value joiner
*/
var createParser = (kvSeparator, paramSeparator) => {
	if (kvSeparator === "=" && paramSeparator === "&") return queryParser;
	return (url) => {
		const urlString = url.toString();
		return Object.fromEntries(urlString.split(paramSeparator).map((pair) => {
			const [key, value] = pair.split(kvSeparator);
			return [decodeURI(key), decodeURI(value)];
		}));
	};
};
/**
* Clamp width and height, maintaining aspect ratio
*/
function clampDimensions(operations, maxWidth = 4e3, maxHeight = 4e3) {
	let { width, height } = operations;
	width = Number(width) || void 0;
	height = Number(height) || void 0;
	if (width && width > maxWidth) {
		if (height) height = Math.round(height * maxWidth / width);
		width = maxWidth;
	}
	if (height && height > maxHeight) {
		if (width) width = Math.round(width * maxHeight / height);
		height = maxHeight;
	}
	return {
		width,
		height
	};
}
function extractFromURL(url) {
	const parsedUrl = toUrl(url);
	const operations = Object.fromEntries(parsedUrl.searchParams.entries());
	for (const key in [
		"width",
		"height",
		"quality"
	]) {
		const value = operations[key];
		if (value) {
			const newVal = Number(value);
			if (!isNaN(newVal)) operations[key] = newVal;
		}
	}
	parsedUrl.search = "";
	return {
		operations,
		src: toCanonicalUrlString(parsedUrl)
	};
}
function normaliseOperations({ keyMap = {}, formatMap = {}, defaults = {} }, operations) {
	if (operations.format && operations.format in formatMap) operations.format = formatMap[operations.format];
	if (operations.width) operations.width = roundIfNumeric(operations.width);
	if (operations.height) operations.height = roundIfNumeric(operations.height);
	for (const k in keyMap) {
		if (!Object.prototype.hasOwnProperty.call(keyMap, k)) continue;
		const key = k;
		if (keyMap[key] === false) {
			delete operations[key];
			continue;
		}
		if (keyMap[key] && operations[key]) {
			operations[keyMap[key]] = operations[key];
			delete operations[key];
		}
	}
	for (const k in defaults) {
		if (!Object.prototype.hasOwnProperty.call(defaults, k)) continue;
		const key = k;
		const value = defaults[key];
		if (!operations[key] && value !== void 0) {
			if (keyMap[key] === false) continue;
			const resolvedKey = keyMap[key] ?? key;
			if (resolvedKey in operations) continue;
			operations[resolvedKey] = value;
		}
	}
	return operations;
}
var invertMap = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
function denormaliseOperations({ keyMap = {}, formatMap = {}, defaults = {} }, operations) {
	const ops = normaliseOperations({
		keyMap: invertMap(keyMap),
		formatMap: invertMap(formatMap),
		defaults
	}, operations);
	if (ops.width) ops.width = roundIfNumeric(ops.width);
	if (ops.height) ops.height = roundIfNumeric(ops.height);
	const q = Number(ops.quality);
	if (!isNaN(q)) ops.quality = q;
	return ops;
}
var queryParser = (url) => {
	const parsedUrl = toUrl(url);
	return Object.fromEntries(parsedUrl.searchParams.entries());
};
function createOperationsGenerator({ kvSeparator = "=", paramSeparator = "&", ...options } = {}) {
	const formatter = createFormatter(kvSeparator, paramSeparator);
	return (operations) => {
		return formatter(normaliseOperations(options, operations));
	};
}
function createOperationsParser({ kvSeparator = "=", paramSeparator = "&", defaults: _, ...options } = {}) {
	const parser = createParser(kvSeparator, paramSeparator);
	return (url) => {
		return denormaliseOperations(options, url ? parser(url) : {});
	};
}
function createOperationsHandlers(config) {
	return {
		operationsGenerator: createOperationsGenerator(config),
		operationsParser: createOperationsParser(config)
	};
}
function paramToBoolean(value) {
	if (value === void 0 || value === null) return;
	try {
		return Boolean(JSON.parse(value?.toString()));
	} catch {
		return Boolean(value);
	}
}
var removeUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== void 0));
function createExtractAndGenerate(extract, generate) {
	return ((src, operations, options) => {
		const base = extract(src, options);
		if (!base) return generate(src, operations, options);
		return generate(base.src, {
			...base.operations,
			...removeUndefined(operations)
		}, {
			...base.options,
			...options
		});
	});
}
//#endregion
//#region node_modules/unpic/esm/src/detect.js
var cdnDomains = new Map(Object.entries(domains_default));
var cdnSubdomains = Object.entries(subdomains_default);
var cdnPaths = Object.entries(paths_default);
/**
* Detects the image CDN provider for a given URL.
*/
function getProviderForUrl(url) {
	return getProviderForUrlByDomain(url) || getProviderForUrlByPath(url);
}
function getProviderForUrlByDomain(url) {
	if (typeof url === "string" && !url.startsWith("https://")) return false;
	const { hostname } = toUrl(url);
	const cdn = cdnDomains.get(hostname);
	if (cdn) return cdn;
	return cdnSubdomains.find(([subdomain]) => hostname.endsWith(subdomain))?.[1] || false;
}
/**
* Gets the image CDN provider for a given URL by its path.
*/
function getProviderForUrlByPath(url) {
	const { pathname } = toUrl(url);
	return cdnPaths.find(([path]) => pathname.startsWith(path))?.[1] || false;
}
//#endregion
//#region node_modules/unpic/esm/src/providers/appwrite.js
var VIEW_URL_SUFFIX = "/view?";
var PREVIEW_URL_SUFFIX = "/preview?";
var { operationsGenerator: operationsGenerator$25, operationsParser: operationsParser$20 } = createOperationsHandlers({
	keyMap: { format: "output" },
	kvSeparator: "=",
	paramSeparator: "&"
});
var generate$26 = (src, modifiers) => {
	const url = toUrl(src.toString().replace(VIEW_URL_SUFFIX, PREVIEW_URL_SUFFIX));
	const projectParam = url.searchParams.get("project") ?? "";
	url.search = operationsGenerator$25(modifiers);
	url.searchParams.append("project", projectParam);
	return toCanonicalUrlString(url);
};
var extract$26 = (url) => {
	if (getProviderForUrlByPath(url) !== "appwrite") return null;
	const parsedUrl = toUrl(url);
	const operations = operationsParser$20(parsedUrl);
	delete operations.project;
	const projectParam = parsedUrl.searchParams.get("project") ?? "";
	parsedUrl.search = "";
	parsedUrl.searchParams.append("project", projectParam);
	return {
		src: parsedUrl.href,
		operations
	};
};
var transform$27 = createExtractAndGenerate(extract$26, generate$26);
//#endregion
//#region node_modules/unpic/esm/src/providers/astro.js
var DEFAULT_ENDPOINT = "/_image";
var { operationsParser: operationsParser$19, operationsGenerator: operationsGenerator$24 } = createOperationsHandlers({
	keyMap: {
		format: "f",
		width: "w",
		height: "h",
		quality: "q"
	},
	defaults: { fit: "cover" }
});
var generate$25 = (src, modifiers, options) => {
	const url = toUrl(`${stripTrailingSlash(options?.baseUrl ?? "")}${options?.endpoint ?? DEFAULT_ENDPOINT}`);
	url.search = operationsGenerator$24(modifiers);
	url.searchParams.set("href", src.toString());
	return toCanonicalUrlString(url);
};
var extract$25 = (url) => {
	const parsedUrl = toUrl(url);
	const src = parsedUrl.searchParams.get("href");
	if (!src) return null;
	parsedUrl.searchParams.delete("href");
	return {
		src,
		operations: operationsParser$19(parsedUrl),
		options: { baseUrl: parsedUrl.origin }
	};
};
var transform$26 = (src, operations, options = {}) => {
	if (toUrl(src).pathname !== (options?.endpoint ?? DEFAULT_ENDPOINT)) return generate$25(src, operations, options);
	const base = extract$25(src);
	if (!base) return generate$25(src, operations, options);
	options.baseUrl ??= base.options.baseUrl;
	return generate$25(base.src, {
		...base.operations,
		...operations
	}, options);
};
//#endregion
//#region node_modules/unpic/esm/src/providers/builder.io.js
var operationsGenerator$23 = createOperationsGenerator({ defaults: {
	fit: "cover",
	format: "webp",
	sharp: true
} });
var extract$24 = extractFromURL;
var generate$24 = (src, modifiers) => {
	const operations = operationsGenerator$23(modifiers);
	const url = toUrl(src);
	url.search = operations;
	return toCanonicalUrlString(url);
};
var transform$25 = createExtractAndGenerate(extract$24, generate$24);
//#endregion
//#region node_modules/unpic/esm/src/providers/bunny.js
var operationsGenerator$22 = createOperationsGenerator({ keyMap: { format: "output" } });
var extract$23 = extractFromURL;
var generate$23 = (src, modifiers) => {
	const operations = operationsGenerator$22(modifiers);
	const url = toUrl(src);
	url.search = operations;
	return toCanonicalUrlString(url);
};
var extractAndGenerate$1 = createExtractAndGenerate(extract$23, generate$23);
var transform$24 = (src, operations) => {
	const { width, height } = operations;
	if (width && height) operations.aspect_ratio ??= `${Math.round(Number(width))}:${Math.round(Number(height))}`;
	return extractAndGenerate$1(src, operations);
};
//#endregion
//#region node_modules/unpic/esm/src/providers/cloudflare.js
var { operationsGenerator: operationsGenerator$21, operationsParser: operationsParser$18 } = createOperationsHandlers({
	keyMap: { "format": "f" },
	defaults: {
		format: "auto",
		fit: "cover"
	},
	formatMap: { jpg: "jpeg" },
	kvSeparator: "=",
	paramSeparator: ","
});
var generate$22 = (src, operations, options) => {
	const modifiers = operationsGenerator$21(operations);
	const url = toUrl(options?.domain ? `https://${options.domain}` : "/");
	url.pathname = `/cdn-cgi/image/${modifiers}/${stripLeadingSlash(src.toString())}`;
	return toCanonicalUrlString(url);
};
var extract$22 = (url, options) => {
	if (getProviderForUrlByPath(url) !== "cloudflare") return null;
	const parsedUrl = toUrl(url);
	const [, , , modifiers, ...src] = parsedUrl.pathname.split("/");
	const operations = operationsParser$18(modifiers);
	return {
		src: toCanonicalUrlString(toUrl(src.join("/"))),
		operations,
		options: { domain: options?.domain ?? (parsedUrl.hostname === "n" ? void 0 : parsedUrl.hostname) }
	};
};
var transform$23 = createExtractAndGenerate(extract$22, generate$22);
//#endregion
//#region node_modules/unpic/esm/src/providers/cloudflare_images.js
var cloudflareImagesRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/imagedelivery\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
var imagedeliveryRegex = /https?:\/\/(?<host>imagedelivery.net)\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
var { operationsGenerator: operationsGenerator$20, operationsParser: operationsParser$17 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h",
		format: "f"
	},
	defaults: { fit: "cover" },
	kvSeparator: "=",
	paramSeparator: ","
});
function formatUrl(options, transformations) {
	const { host, accountHash, imageId } = options;
	if (!host || !accountHash || !imageId) throw new Error("Missing required Cloudflare Images options");
	return [
		"https:/",
		...host === "imagedelivery.net" ? [host] : [
			host,
			"cdn-cgi",
			"imagedelivery"
		],
		accountHash,
		imageId,
		transformations
	].filter(Boolean).join("/");
}
var generate$21 = (_src, operations, options = {}) => {
	return toCanonicalUrlString(toUrl(formatUrl(options, operationsGenerator$20(operations))));
};
var extract$21 = (url) => {
	const parsedUrl = toUrl(url);
	const matches = [...parsedUrl.toString().matchAll(cloudflareImagesRegex), ...parsedUrl.toString().matchAll(imagedeliveryRegex)];
	if (!matches[0]?.groups) return null;
	const { host, accountHash, imageId, transformations } = matches[0].groups;
	const operations = operationsParser$17(transformations || "");
	const options = {
		host,
		accountHash,
		imageId
	};
	return {
		src: formatUrl(options),
		operations,
		options
	};
};
var transform$22 = (src, operations, options = {}) => {
	const extracted = extract$21(src);
	if (!extracted) throw new Error("Invalid Cloudflare Images URL");
	const newOperations = {
		...extracted.operations,
		...operations
	};
	return generate$21(extracted.src, newOperations, {
		...extracted.options,
		...options
	});
};
//#endregion
//#region node_modules/unpic/esm/src/providers/cloudimage.js
var { operationsGenerator: operationsGenerator$19, operationsParser: operationsParser$16 } = createOperationsHandlers({
	keyMap: {
		format: "force_format",
		width: "w",
		height: "h",
		quality: "q"
	},
	defaults: { org_if_sml: 1 }
});
var generate$20 = (src, modifiers = {}, { token } = {}) => {
	if (!token) throw new Error("Token is required for Cloudimage URLs" + src);
	let srcString = src.toString();
	srcString = srcString.replace(/^https?:\/\//, "");
	if (srcString.includes("?")) {
		modifiers.ci_url_encoded = 1;
		srcString = encodeURIComponent(srcString);
	}
	const operations = operationsGenerator$19(modifiers);
	const url = new URL(`https://${token}.cloudimg.io/`);
	url.pathname = srcString;
	url.search = operations;
	return url.toString();
};
var extract$20 = (src, options = {}) => {
	const url = toUrl(src);
	if (getProviderForUrl(url) !== "cloudimage") return null;
	const operations = operationsParser$16(url);
	let originalSrc = url.pathname;
	if (operations.ci_url_encoded) {
		originalSrc = decodeURIComponent(originalSrc);
		delete operations.ci_url_encoded;
	}
	options.token ??= url.hostname.replace(".cloudimg.io", "");
	return {
		src: `${url.protocol}/${originalSrc}`,
		operations,
		options
	};
};
var transform$21 = createExtractAndGenerate(extract$20, generate$20);
//#endregion
//#region node_modules/unpic/esm/src/providers/cloudinary.js
var publicRegex = /https?:\/\/(?<host>res\.cloudinary\.com)\/(?<cloudName>[a-zA-Z0-9-]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<id>(?:[^\s\/]+\/)*[^\s\/]+(?:\.[a-zA-Z0-9]+)?)$/;
var privateRegex = /https?:\/\/(?<host>(?<cloudName>[a-zA-Z0-9-]+)-res\.cloudinary\.com|[a-zA-Z0-9.-]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<id>(?:[^\s\/]+\/)*[^\s\/]+(?:\.[a-zA-Z0-9]+)?)$/;
var { operationsGenerator: operationsGenerator$18, operationsParser: operationsParser$15 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h",
		format: "f",
		quality: "q"
	},
	defaults: {
		format: "auto",
		c: "lfill"
	},
	kvSeparator: "_",
	paramSeparator: ","
});
function formatCloudinaryUrl({ host, cloudName, assetType, deliveryType, signature, transformations, version, id }) {
	return [
		"https:/",
		host,
		host === "res.cloudinary.com" ? cloudName : void 0,
		assetType,
		deliveryType,
		signature,
		transformations,
		version,
		id
	].filter(Boolean).join("/");
}
function parseCloudinaryUrl(url) {
	let matches = url.toString().match(publicRegex);
	if (!matches?.length) matches = url.toString().match(privateRegex);
	if (!matches?.length) return null;
	return matches.groups || {};
}
var transform$20 = (src, operations) => {
	const group = parseCloudinaryUrl(src.toString());
	if (!group) return src.toString();
	group.transformations = operationsGenerator$18({
		...operationsParser$15(group.transformations || ""),
		...operations
	});
	return formatCloudinaryUrl(group);
};
//#endregion
//#region node_modules/unpic/esm/src/providers/contentful.js
var operationsGenerator$17 = createOperationsGenerator({
	keyMap: {
		format: "fm",
		width: "w",
		height: "h",
		quality: "q"
	},
	defaults: { fit: "fill" }
});
var generate$19 = (src, modifiers) => {
	const operations = operationsGenerator$17(modifiers);
	const url = new URL(src);
	url.search = operations;
	return toCanonicalUrlString(url);
};
var extractAndGenerate = createExtractAndGenerate(extractFromURL, generate$19);
var transform$19 = (src, operations) => {
	const { width, height } = clampDimensions(operations, 4e3, 4e3);
	return extractAndGenerate(src, {
		...operations,
		width,
		height
	});
};
//#endregion
//#region node_modules/unpic/esm/src/providers/contentstack.js
var operationsGenerator$16 = createOperationsGenerator({ defaults: {
	auto: "webp",
	disable: "upscale"
} });
var generate$18 = (src, operations, { baseURL = "https://images.contentstack.io/" } = {}) => {
	if (operations.width && operations.height) operations.fit ??= "crop";
	const modifiers = operationsGenerator$16(operations);
	const url = toUrl(src);
	if (url.hostname === "n") {
		url.protocol = "https:";
		url.hostname = new URL(baseURL).hostname;
	}
	url.search = modifiers;
	return toCanonicalUrlString(url);
};
var extract$18 = (url) => {
	const { src, operations } = extractFromURL(url) ?? {};
	if (!operations || !src) return null;
	const { origin } = toUrl(url);
	return {
		src,
		operations,
		options: { baseURL: origin }
	};
};
var transform$18 = createExtractAndGenerate(extract$18, generate$18);
//#endregion
//#region node_modules/unpic/esm/src/providers/directus.js
var operationsGenerator$15 = createOperationsGenerator({ defaults: {
	withoutEnlargement: true,
	fit: "cover"
} });
var generate$17 = (src, operations) => {
	if (Array.isArray(operations.transforms)) operations.transforms = JSON.stringify(operations.transforms);
	const modifiers = operationsGenerator$15(operations);
	const url = toUrl(src);
	url.search = modifiers;
	return toCanonicalUrlString(url);
};
var extract$17 = (url) => {
	const base = extractFromURL(url);
	if (base?.operations?.transforms && typeof base.operations.transforms === "string") try {
		base.operations.transforms = JSON.parse(base.operations.transforms);
	} catch {
		return null;
	}
	return base;
};
var transform$17 = createExtractAndGenerate(extract$17, generate$17);
//#endregion
//#region node_modules/unpic/esm/src/providers/hygraph.js
var hygraphRegex = /https:\/\/(?<region>[a-z0-9-]+)\.graphassets\.com\/(?<envId>[a-zA-Z0-9]+)(?:\/(?<transformations>.*?))?\/(?<handle>[a-zA-Z0-9]+)$/;
var { operationsGenerator: operationsGenerator$14, operationsParser: operationsParser$14 } = createOperationsHandlers({
	keyMap: {
		width: "width",
		height: "height",
		format: "format"
	},
	defaults: {
		format: "auto",
		fit: "crop"
	}
});
var extract$16 = (url) => {
	const matches = toUrl(url).toString().match(hygraphRegex);
	if (!matches?.groups) return null;
	const { region, envId, handle, transformations } = matches.groups;
	const operations = {};
	if (transformations) transformations.split("/").forEach((part) => {
		const [operation, params] = part.split("=");
		if (operation === "resize" && params) params.split(",").forEach((param) => {
			const [key, value] = param.split(":");
			if (key === "width" || key === "height") operations[key] = Number(value);
			else if (key === "fit") operations.fit = value;
		});
		else if (operation === "output" && params) params.split(",").forEach((param) => {
			const [key, value] = param.split(":");
			if (key === "format") operations.format = value;
		});
		else if (operation === "auto_image") operations.format = "auto";
	});
	return {
		src: `https://${region}.graphassets.com/${envId}/${handle}`,
		operations,
		options: {
			region,
			envId,
			handle
		}
	};
};
var generate$16 = (src, operations, options = {}) => {
	const extracted = extract$16(src);
	if (!extracted) throw new Error("Invalid Hygraph URL");
	const { region, envId, handle } = {
		...extracted.options,
		...options
	};
	const transforms = [];
	if (operations.width || operations.height) {
		const resize = [];
		if (operations.width && operations.height) resize.push("fit:crop");
		else if (operations.fit) resize.push(`fit:${operations.fit}`);
		if (operations.width) resize.push(`width:${operations.width}`);
		if (operations.height) resize.push(`height:${operations.height}`);
		if (resize.length) transforms.push(`resize=${resize.join(",")}`);
	}
	if (operations.format === "auto" || !operations.format && !extracted.operations.format) transforms.push("auto_image");
	else if (operations.format) transforms.push(`output=format:${operations.format}`);
	return toCanonicalUrlString(toUrl(`${`https://${region}.graphassets.com/${envId}`}${transforms.length > 0 ? "/" + transforms.join("/") : ""}/${handle}`));
};
var transform$16 = createExtractAndGenerate(extract$16, generate$16);
//#endregion
//#region node_modules/unpic/esm/src/providers/imageengine.js
var { operationsGenerator: operationsGenerator$13, operationsParser: operationsParser$13 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h",
		format: "f"
	},
	defaults: { m: "cropbox" },
	kvSeparator: "_",
	paramSeparator: "/"
});
var generate$15 = (src, operations) => {
	const modifiers = operationsGenerator$13(operations);
	const url = toUrl(src);
	url.searchParams.set("imgeng", modifiers);
	return toCanonicalUrlString(url);
};
var extract$15 = (url) => {
	const parsedUrl = toUrl(url);
	const imgeng = parsedUrl.searchParams.get("imgeng");
	if (!imgeng) return null;
	const operations = operationsParser$13(imgeng);
	parsedUrl.searchParams.delete("imgeng");
	return {
		src: toCanonicalUrlString(parsedUrl),
		operations
	};
};
var transform$15 = createExtractAndGenerate(extract$15, generate$15);
//#endregion
//#region node_modules/unpic/esm/src/providers/imagekit.js
var { operationsGenerator: operationsGenerator$12, operationsParser: operationsParser$12 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h",
		format: "f",
		quality: "q"
	},
	defaults: {
		c: "maintain_ratio",
		fo: "auto"
	},
	kvSeparator: "-",
	paramSeparator: ","
});
var generate$14 = (src, operations) => {
	const modifiers = operationsGenerator$12(operations);
	const url = toUrl(src);
	url.searchParams.set("tr", modifiers);
	return toCanonicalUrlString(url);
};
var extract$14 = (url) => {
	const parsedUrl = toUrl(url);
	let trPart = null;
	let path = parsedUrl.pathname;
	if (parsedUrl.searchParams.has("tr")) {
		trPart = parsedUrl.searchParams.get("tr");
		parsedUrl.searchParams.delete("tr");
	} else {
		const pathParts = parsedUrl.pathname.split("/");
		const trIndex = pathParts.findIndex((part) => part.startsWith("tr:"));
		if (trIndex !== -1) {
			trPart = pathParts[trIndex].slice(3);
			path = pathParts.slice(0, trIndex).concat(pathParts.slice(trIndex + 1)).join("/");
		}
	}
	if (!trPart) return null;
	parsedUrl.pathname = path;
	const operations = operationsParser$12(trPart);
	return {
		src: toCanonicalUrlString(parsedUrl),
		operations
	};
};
var transform$14 = createExtractAndGenerate(extract$14, generate$14);
//#endregion
//#region node_modules/unpic/esm/src/providers/imgix.js
var { operationsGenerator: operationsGenerator$11, operationsParser: operationsParser$11 } = createOperationsHandlers({
	keyMap: {
		format: "fm",
		width: "w",
		height: "h",
		quality: "q"
	},
	defaults: {
		fit: "min",
		auto: "format"
	}
});
var extract$13 = (url) => {
	const src = toUrl(url);
	const operations = operationsParser$11(url);
	src.search = "";
	return {
		src: toCanonicalUrlString(src),
		operations
	};
};
var generate$13 = (src, operations) => {
	const modifiers = operationsGenerator$11(operations);
	const url = toUrl(src);
	url.search = modifiers;
	if (url.searchParams.has("fm") && url.searchParams.get("auto") === "format") url.searchParams.delete("auto");
	return toCanonicalUrlString(url);
};
var transform$13 = createExtractAndGenerate(extract$13, generate$13);
//#endregion
//#region node_modules/unpic/esm/src/providers/ipx.js
var { operationsGenerator: operationsGenerator$10, operationsParser: operationsParser$10 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h",
		quality: "q",
		format: "f"
	},
	defaults: { f: "auto" },
	kvSeparator: "_",
	paramSeparator: ","
});
var generate$12 = (src, operations, options) => {
	if (operations.width && operations.height) {
		operations.s = `${operations.width}x${operations.height}`;
		delete operations.width;
		delete operations.height;
	}
	const modifiers = operationsGenerator$10(operations);
	const url = toUrl(options?.baseURL ?? "/_ipx");
	url.pathname = `${stripTrailingSlash(url.pathname)}/${modifiers}/${stripLeadingSlash(src.toString())}`;
	return toCanonicalUrlString(url);
};
var extract$12 = (url) => {
	const parsedUrl = toUrl(url);
	const [, baseUrlPart, modifiers, ...srcParts] = parsedUrl.pathname.split("/");
	if (!modifiers || !srcParts.length) return null;
	const operations = operationsParser$10(modifiers);
	if (operations.s) {
		const [width, height] = operations.s.split("x").map(Number);
		operations.width = width;
		operations.height = height;
		delete operations.s;
	}
	return {
		src: "/" + srcParts.join("/"),
		operations,
		options: { baseURL: `${parsedUrl.origin}/${baseUrlPart}` }
	};
};
var transform$12 = (src, operations, options) => {
	const url = toUrl(src);
	const baseURL = options?.baseURL;
	if (baseURL && url.toString().startsWith(baseURL) || url.pathname.startsWith("/_ipx")) {
		const extracted = extract$12(src);
		if (extracted) return generate$12(extracted.src, {
			...extracted.operations,
			...operations
		}, { baseURL: extracted.options.baseURL });
	}
	return generate$12(src, operations, { baseURL });
};
//#endregion
//#region node_modules/unpic/esm/src/providers/keycdn.js
var BOOLEAN_PARAMS = [
	"enlarge",
	"flip",
	"flop",
	"negate",
	"normalize",
	"grayscale",
	"removealpha",
	"olrepeat",
	"progressive",
	"adaptive",
	"lossless",
	"nearlossless",
	"metadata"
];
var { operationsGenerator: operationsGenerator$9, operationsParser: operationsParser$9 } = createOperationsHandlers({
	defaults: { fit: "cover" },
	formatMap: { jpg: "jpeg" }
});
var generate$11 = (src, operations) => {
	const url = toUrl(src);
	for (const key of BOOLEAN_PARAMS) if (operations[key] !== void 0) operations[key] = operations[key] ? 1 : 0;
	url.search = operationsGenerator$9(operations);
	return toCanonicalUrlString(url);
};
var extract$11 = (url) => {
	const parsedUrl = toUrl(url);
	const operations = operationsParser$9(parsedUrl);
	for (const key of BOOLEAN_PARAMS) if (operations[key] !== void 0) operations[key] = paramToBoolean(operations[key]);
	parsedUrl.search = "";
	return {
		src: toCanonicalUrlString(parsedUrl),
		operations
	};
};
var transform$11 = createExtractAndGenerate(extract$11, generate$11);
//#endregion
//#region node_modules/unpic/esm/src/providers/kontent.ai.js
var { operationsGenerator: operationsGenerator$8, operationsParser: operationsParser$8 } = createOperationsHandlers({
	formatMap: { jpg: "jpeg" },
	keyMap: {
		format: "fm",
		width: "w",
		height: "h",
		quality: "q"
	}
});
var generate$10 = (src, operations) => {
	const url = toUrl(src);
	if (operations.lossless !== void 0) operations.lossless = operations.lossless ? 1 : 0;
	if (operations.width && operations.height) operations.fit = "crop";
	url.search = operationsGenerator$8(operations);
	return toCanonicalUrlString(url);
};
var extract$10 = (url) => {
	const parsedUrl = toUrl(url);
	const operations = operationsParser$8(parsedUrl);
	if (operations.lossless !== void 0) operations.lossless = paramToBoolean(operations.lossless);
	parsedUrl.search = "";
	return {
		src: toCanonicalUrlString(parsedUrl),
		operations
	};
};
var transform$10 = createExtractAndGenerate(extract$10, generate$10);
//#endregion
//#region node_modules/unpic/esm/src/providers/netlify.js
var { operationsGenerator: operationsGenerator$7, operationsParser: operationsParser$7 } = createOperationsHandlers({
	defaults: { fit: "cover" },
	keyMap: {
		format: "fm",
		width: "w",
		height: "h",
		quality: "q"
	}
});
var generate$9 = (src, operations, options = {}) => {
	const url = toUrl(`${options.baseUrl || ""}/.netlify/images`);
	url.search = operationsGenerator$7(operations);
	url.searchParams.set("url", src.toString());
	return toCanonicalUrlString(url);
};
var extract$9 = (url) => {
	if (getProviderForUrlByPath(url) !== "netlify") return null;
	const parsedUrl = toUrl(url);
	const operations = operationsParser$7(parsedUrl);
	delete operations.url;
	const sourceUrl = parsedUrl.searchParams.get("url") || "";
	parsedUrl.search = "";
	return {
		src: sourceUrl,
		operations,
		options: { baseUrl: parsedUrl.hostname === "n" ? void 0 : parsedUrl.origin }
	};
};
var transform$9 = createExtractAndGenerate(extract$9, generate$9);
//#endregion
//#region node_modules/unpic/esm/src/providers/vercel.js
var { operationsGenerator: operationsGenerator$6, operationsParser: operationsParser$6 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		quality: "q",
		height: false,
		format: false
	},
	defaults: { q: 75 }
});
var generate$8 = (src, operations, options = {}) => {
	const url = toUrl(`${options.baseUrl || ""}/${options.prefix || "_vercel"}/image`);
	url.search = operationsGenerator$6(operations);
	url.searchParams.append("url", src.toString());
	return toCanonicalUrlString(url);
};
var extract$8 = (url, options = {}) => {
	if (!["vercel", "nextjs"].includes(getProviderForUrlByPath(url) || "")) return null;
	const parsedUrl = toUrl(url);
	const sourceUrl = parsedUrl.searchParams.get("url") || "";
	parsedUrl.searchParams.delete("url");
	const operations = operationsParser$6(parsedUrl);
	parsedUrl.search = "";
	return {
		src: sourceUrl,
		operations,
		options: { baseUrl: options.baseUrl ?? parsedUrl.origin }
	};
};
var transform$8 = createExtractAndGenerate(extract$8, generate$8);
//#endregion
//#region node_modules/unpic/esm/src/providers/nextjs.js
var generate$7 = (src, operations, options = {}) => generate$8(src, operations, {
	...options,
	prefix: "_next"
});
var extract$7 = (url, options) => extract$8(url, options);
var transform$7 = createExtractAndGenerate(extract$7, generate$7);
//#endregion
//#region node_modules/unpic/esm/src/providers/scene7.js
var { operationsGenerator: operationsGenerator$5, operationsParser: operationsParser$5 } = createOperationsHandlers({
	keyMap: {
		width: "wid",
		height: "hei",
		quality: "qlt",
		format: "fmt"
	},
	defaults: { fit: "crop,0" }
});
var BASE = "https://s7d1.scene7.com/is/image/";
var generate$6 = (src, operations) => {
	const url = new URL(src, BASE);
	url.search = operationsGenerator$5(operations);
	return toCanonicalUrlString(url);
};
var extract$6 = (url) => {
	if (getProviderForUrl(url) !== "scene7") return null;
	const parsedUrl = new URL(url, BASE);
	const operations = operationsParser$5(parsedUrl);
	parsedUrl.search = "";
	return {
		src: parsedUrl.toString(),
		operations
	};
};
var transform$6 = createExtractAndGenerate(extract$6, generate$6);
//#endregion
//#region node_modules/unpic/esm/src/providers/shopify.js
var shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
var { operationsGenerator: operationsGenerator$4, operationsParser: operationsParser$4 } = createOperationsHandlers({ keyMap: { format: false } });
var generate$5 = (src, operations) => {
	const url = toUrl(src);
	url.pathname = url.pathname.replace(shopifyRegex, "$1$6");
	url.search = operationsGenerator$4(operations);
	return toCanonicalUrlString(url);
};
var extract$5 = (url) => {
	const parsedUrl = toUrl(url);
	const match = shopifyRegex.exec(parsedUrl.pathname);
	const operations = operationsParser$4(parsedUrl);
	if (match) {
		const [, , , width, height, crop] = match;
		if (width && height && !operations.width && !operations.height) {
			operations.width = parseInt(width, 10);
			operations.height = parseInt(height, 10);
		}
		if (crop) operations.crop ??= crop;
	}
	parsedUrl.pathname = parsedUrl.pathname.replace(shopifyRegex, "$1$6");
	for (const key of [
		"width",
		"height",
		"crop",
		"pad_color",
		"format"
	]) parsedUrl.searchParams.delete(key);
	return {
		src: parsedUrl.toString(),
		operations
	};
};
var transform$5 = createExtractAndGenerate(extract$5, generate$5);
//#endregion
//#region node_modules/unpic/esm/src/providers/storyblok.js
var storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/;
var storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/;
var filterSplitterRegex = /:(?![^(]*\))/;
var splitFilters = (filters) => {
	if (!filters) return {};
	return Object.fromEntries(filters.split(filterSplitterRegex).map((filter) => {
		if (!filter) return [];
		const [key, value] = filter.split("(");
		return [key, value.replace(")", "")];
	}));
};
var generateFilters = (filters) => {
	if (!filters) return;
	const filterItems = Object.entries(filters).map(([key, value]) => `${key}(${value ?? ""})`);
	if (filterItems.length === 0) return;
	return `filters:${filterItems.join(":")}`;
};
var extract$4 = (url) => {
	const parsedUrl = toUrl(url);
	const matches = (parsedUrl.hostname === "img2.storyblok.com" ? storyBlokImg2 : storyBlokAssets).exec(parsedUrl.pathname);
	if (!matches || !matches.groups) return null;
	const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
	const { format, ...filterMap } = splitFilters(filters ?? "");
	if (parsedUrl.hostname === "img2.storyblok.com") parsedUrl.hostname = "a.storyblok.com";
	const operations = Object.fromEntries([
		["width", Number(width) || void 0],
		["height", Number(height) || void 0],
		["format", format],
		["crop", crop],
		["filters", filterMap],
		["flipx", flipx],
		["flipy", flipy]
	].filter(([_, value]) => value !== void 0));
	return {
		src: `${parsedUrl.origin}${id}`,
		operations
	};
};
var generate$4 = (src, operations) => {
	const url = toUrl(src);
	const { width = 0, height = 0, format, crop, filters = {}, flipx = "", flipy = "" } = operations;
	const size = `${flipx}${width}x${flipy}${height}`;
	if (format) filters.format = format;
	url.pathname = [
		url.pathname,
		"m",
		crop,
		size,
		generateFilters(filters)
	].filter(Boolean).join("/");
	return toCanonicalUrlString(url);
};
var transform$4 = createExtractAndGenerate(extract$4, generate$4);
//#endregion
//#region node_modules/unpic/esm/src/providers/supabase.js
var STORAGE_URL_PREFIX = "/storage/v1/object/public/";
var RENDER_URL_PREFIX = "/storage/v1/render/image/public/";
var isRenderUrl = (url) => url.pathname.startsWith(RENDER_URL_PREFIX);
var { operationsGenerator: operationsGenerator$3, operationsParser: operationsParser$3 } = createOperationsHandlers({});
var generate$3 = (src, operations) => {
	const url = toUrl(src);
	url.pathname = url.pathname.replace(RENDER_URL_PREFIX, STORAGE_URL_PREFIX);
	if (operations.format && operations.format !== "origin") delete operations.format;
	url.search = operationsGenerator$3(operations);
	return toCanonicalUrlString(url).replace(STORAGE_URL_PREFIX, RENDER_URL_PREFIX);
};
var extract$3 = (url) => {
	const parsedUrl = toUrl(url);
	const operations = operationsParser$3(parsedUrl);
	const isRender = isRenderUrl(parsedUrl);
	const imagePath = parsedUrl.pathname.replace(RENDER_URL_PREFIX, "").replace(STORAGE_URL_PREFIX, "");
	if (!isRender) return {
		src: toCanonicalUrlString(parsedUrl),
		operations
	};
	return {
		src: `${parsedUrl.origin}${STORAGE_URL_PREFIX}${imagePath}`,
		operations
	};
};
var transform$3 = createExtractAndGenerate(extract$3, generate$3);
//#endregion
//#region node_modules/unpic/esm/src/providers/uploadcare.js
var uploadcareRegex = /^https?:\/\/(?<host>[^\/]+)\/(?<uuid>[^\/]+)(?:\/(?<filename>[^\/]+)?)?/;
var { operationsGenerator: operationsGenerator$2, operationsParser: operationsParser$2 } = createOperationsHandlers({
	keyMap: {
		width: false,
		height: false
	},
	defaults: { format: "auto" },
	kvSeparator: "/",
	paramSeparator: "/-/"
});
var extract$2 = (url) => {
	const parsedUrl = toUrl(url);
	const match = uploadcareRegex.exec(parsedUrl.toString());
	if (!match || !match.groups) return null;
	const { host, uuid } = match.groups;
	const [, ...operationsString] = parsedUrl.pathname.split("/-/");
	const operations = operationsParser$2(operationsString.join("/-/") || "");
	if (operations.resize) {
		const [width, height] = operations.resize.split("x");
		if (width) operations.width = parseInt(width);
		if (height) operations.height = parseInt(height);
		delete operations.resize;
	}
	return {
		src: `https://${host}/${uuid}/`,
		operations,
		options: { host }
	};
};
var generate$2 = (src, operations, options = {}) => {
	const url = toUrl(src);
	const host = options.host || url.hostname;
	const match = uploadcareRegex.exec(url.toString());
	if (match?.groups) url.pathname = `/${match.groups.uuid}/`;
	operations.resize = operations.resize || `${operations.width ?? ""}x${operations.height ?? ""}`;
	delete operations.width;
	delete operations.height;
	const modifiers = addTrailingSlash(operationsGenerator$2(operations));
	url.hostname = host;
	url.pathname = stripTrailingSlash(url.pathname) + (modifiers ? `/-/${modifiers}` : "") + (match?.groups?.filename ?? "");
	return toCanonicalUrlString(url);
};
var transform$2 = createExtractAndGenerate(extract$2, generate$2);
//#endregion
//#region node_modules/unpic/esm/src/providers/wordpress.js
var { operationsGenerator: operationsGenerator$1, operationsParser: operationsParser$1 } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h"
	},
	defaults: { crop: "1" }
});
var generate$1 = (src, operations) => {
	const url = toUrl(src);
	const { crop } = operations;
	if (typeof crop !== "undefined" && crop !== "0") operations.crop = crop ? "1" : "0";
	url.search = operationsGenerator$1(operations);
	return toCanonicalUrlString(url);
};
var extract$1 = (url) => {
	const parsedUrl = toUrl(url);
	const operations = operationsParser$1(parsedUrl);
	if (operations.crop !== void 0) operations.crop = operations.crop === "1";
	parsedUrl.search = "";
	return {
		src: toCanonicalUrlString(parsedUrl),
		operations
	};
};
var transform$1 = createExtractAndGenerate(extract$1, generate$1);
//#endregion
//#region node_modules/unpic/esm/src/providers/wsrv.js
var { operationsGenerator, operationsParser } = createOperationsHandlers({
	keyMap: {
		width: "w",
		height: "h",
		format: "output",
		quality: "q"
	},
	defaults: { fit: "cover" }
});
var extract = (url) => {
	const urlObj = toUrl(url);
	const srcParam = urlObj.searchParams.get("url");
	if (!srcParam) return null;
	let src = srcParam;
	if (!src.startsWith("http://") && !src.startsWith("https://")) src = "https://" + src;
	urlObj.searchParams.delete("url");
	const operations = operationsParser(urlObj);
	return {
		src,
		operations
	};
};
var generate = (src, operations) => {
	const url = new URL("https://wsrv.nl/");
	const cleanSrc = (typeof src === "string" ? src : src.toString()).replace(/^https?:\/\//, "");
	url.searchParams.set("url", cleanSrc);
	const params = operationsGenerator(operations);
	const searchParams = new URLSearchParams(params);
	for (const [key, value] of searchParams) if (key !== "url") url.searchParams.set(key, value);
	return toCanonicalUrlString(url);
};
//#endregion
//#region node_modules/unpic/esm/src/transform.js
var transformerMap = {
	appwrite: transform$27,
	astro: transform$26,
	"builder.io": transform$25,
	bunny: transform$24,
	cloudflare: transform$23,
	cloudflare_images: transform$22,
	cloudimage: transform$21,
	cloudinary: transform$20,
	contentful: transform$19,
	contentstack: transform$18,
	directus: transform$17,
	hygraph: transform$16,
	imageengine: transform$15,
	imagekit: transform$14,
	imgix: transform$13,
	ipx: transform$12,
	keycdn: transform$11,
	"kontent.ai": transform$10,
	netlify: transform$9,
	nextjs: transform$7,
	scene7: transform$6,
	shopify: transform$5,
	storyblok: transform$4,
	supabase: transform$3,
	uploadcare: transform$2,
	vercel: transform$8,
	wordpress: transform$1,
	wsrv: createExtractAndGenerate(extract, generate)
};
/**
* Returns a transformer function if the given CDN is supported
*/
function getTransformerForCdn(cdn) {
	if (!cdn) return;
	return transformerMap[cdn];
}
//#endregion
//#region node_modules/@unpic/core/dist/auto.mjs
function transformProps({ cdn, fallback, operations = {}, options, ...props }) {
	cdn ??= getProviderForUrl(props.src) || fallback;
	if (!cdn) return props;
	const transformer = getTransformerForCdn(cdn);
	if (!transformer) return props;
	return transformBaseImageProps({
		...props,
		operations: operations?.[cdn],
		options: options?.[cdn],
		transformer
	});
}
function transformSourceProps({ cdn, fallback, operations, options, ...props }) {
	cdn ??= getProviderForUrl(props.src) || fallback;
	if (!cdn) return props;
	const transformer = getTransformerForCdn(cdn);
	if (!transformer) return props;
	return transformBaseSourceProps({
		...props,
		operations: operations?.[cdn],
		options: options?.[cdn],
		transformer
	});
}
//#endregion
//#region node_modules/@unpic/react/dist/chunk-SNIEDJZS.mjs
var Image$2 = import_react.forwardRef(function Image2(props, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		...camelizeProps(transformProps(props)),
		ref
	});
});
import_react.forwardRef(function Source2(props, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
		...camelizeProps(transformSourceProps(props)),
		ref
	});
});
//#endregion
//#region node_modules/vinext/dist/shims/image.js
/**
* next/image shim
*
* Translates Next.js Image props to @unpic/react Image component.
* @unpic/react auto-detects CDN from URL and uses native transforms.
* For local images (relative paths), routes through `/_vinext/image`
* for server-side optimization (resize, format negotiation, quality).
*
* Remote images are validated against `images.remotePatterns` and
* `images.domains` from next.config.js. Unmatched URLs are blocked
* in production and warn in development, matching Next.js behavior.
*/
/**
* Image config injected at build time via Vite define.
* Serialized as JSON — parsed once at module level.
*/
var __imageRemotePatterns = (() => {
	try {
		return JSON.parse("[]");
	} catch {
		return [];
	}
})();
var __imageDomains = (() => {
	try {
		return JSON.parse("[]");
	} catch {
		return [];
	}
})();
var __hasImageConfig = __imageRemotePatterns.length > 0 || __imageDomains.length > 0;
var __imageDeviceSizes = (() => {
	try {
		return JSON.parse("[640,750,828,1080,1200,1920,2048,3840]");
	} catch {
		return [
			640,
			750,
			828,
			1080,
			1200,
			1920,
			2048,
			3840
		];
	}
})();
/**
* Validate that a remote URL is allowed by the configured remote patterns.
* Returns true if the URL is allowed, false otherwise.
*
* When no remotePatterns/domains are configured, all remote URLs are allowed
* (backwards-compatible — user hasn't opted into restriction).
*
* When patterns ARE configured, only matching URLs are allowed.
* In development, non-matching URLs produce a console warning.
* In production, non-matching URLs are blocked (src replaced with empty string).
*
* Private-IP hostnames are additionally rejected unless dangerouslyAllowLocalIP
* is set, mirroring Next.js's fetchExternalImage guard.
*/
function validateRemoteUrl(src) {
	let url;
	try {
		url = new URL(src, "http://n");
	} catch {
		return {
			allowed: false,
			reason: `Invalid URL: ${src}`
		};
	}
	if (isPrivateIp(url.hostname)) return {
		allowed: false,
		reason: `Image URL "${src}" resolved to private IP. If this is expected and you understand SSRF risk, use images.dangerouslyAllowLocalIP = true to continue.`
	};
	if (!__hasImageConfig) return { allowed: true };
	if (hasRemoteMatch(__imageDomains, __imageRemotePatterns, url)) return { allowed: true };
	return {
		allowed: false,
		reason: `Image URL "${src}" is not configured in images.remotePatterns or images.domains in next.config.js. See: https://nextjs.org/docs/messages/next-image-unconfigured-host`
	};
}
/**
* A version of useLayoutEffect that doesn't warn during SSR.
* Do not rename this to "isomorphic layout effect". There is no such thing as
* an isomorphic Layout Effect since there is no Layout on the server.
* Ported from Next.js: https://github.com/vercel/next.js/pull/93209
*/
var useNonWarningLayoutEffect = typeof window === "undefined" ? import_react.useEffect : import_react.useLayoutEffect;
/**
* Create a synthetic React load event for replaying onLoad/onLoadingComplete
* during hydration when the image already completed loading.
*
* This function creates a native Event("load") via the DOM Event constructor
* and must only be called in a browser context (client-side layout effect).
* It mirrors the pattern used in Next.js `handleLoading`.
*/
function createSyntheticLoadEvent(img) {
	const nativeEvent = new Event("load");
	Object.defineProperty(nativeEvent, "target", {
		writable: false,
		value: img
	});
	let prevented = false;
	let stopped = false;
	return {
		bubbles: nativeEvent.bubbles,
		cancelable: nativeEvent.cancelable,
		currentTarget: img,
		defaultPrevented: false,
		eventPhase: nativeEvent.eventPhase,
		isTrusted: false,
		nativeEvent,
		target: img,
		timeStamp: nativeEvent.timeStamp,
		type: "load",
		isDefaultPrevented: () => prevented,
		isPropagationStopped: () => stopped,
		persist: () => {},
		preventDefault: () => {
			prevented = true;
			nativeEvent.preventDefault();
		},
		stopPropagation: () => {
			stopped = true;
			nativeEvent.stopPropagation();
		}
	};
}
/**
* Sanitize a blurDataURL to prevent CSS injection.
*
* A crafted data URL containing `)` can break out of the `url()` CSS function,
* allowing injection of arbitrary CSS properties or rules. Characters like `{`,
* `}`, and `\` can also assist in crafting injection payloads.
*
* This validates the URL starts with `data:image/` and rejects characters that
* could escape the `url()` context. Semicolons are allowed since they're part
* of valid data URLs (`data:image/png;base64,...`) and harmless inside `url()`.
*
* Returns undefined for invalid URLs, which causes the blur placeholder to be
* skipped gracefully.
*/
function sanitizeBlurDataURL(url) {
	if (!url.startsWith("data:image/")) return void 0;
	if (/[)(}{\\'"\n\r]/.test(url)) return void 0;
	return url;
}
/**
* Determine if a src is a remote URL (CDN-optimizable) or local.
*/
function isRemoteUrl(src) {
	return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//");
}
/**
* Resolve src, width, height, blurDataURL from Image props (string or StaticImageData).
* Shared by the Image component and getImageProps to keep behavior in sync.
*/
function resolveImageSource(v) {
	return {
		src: typeof v.src === "string" ? v.src : v.src.src,
		width: v.width ?? (typeof v.src === "object" ? v.src.width : void 0),
		height: v.height ?? (typeof v.src === "object" ? v.src.height : void 0),
		blurDataURL: v.blurDataURL ?? (typeof v.src === "object" ? v.src.blurDataURL : void 0)
	};
}
/**
* Responsive image widths matching Next.js's device sizes config.
* These are the breakpoints used for srcSet generation.
* Configurable via `images.deviceSizes` in next.config.js.
*/
var RESPONSIVE_WIDTHS = __imageDeviceSizes;
/**
* Build a `/_vinext/image` optimization URL.
*
* In production (Cloudflare Workers), the worker intercepts this path and uses
* the Images binding to resize/transcode on the fly. In dev, the Vite dev
* server handles it as a passthrough (serves the original file).
*/
function imageOptimizationUrl(src, width, quality = 75) {
	return `/_vinext/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}
/**
* Generate a srcSet string for responsive images.
*
* Each width points to the `/_vinext/image` optimization endpoint so the
* server can resize and transcode the image. Only includes widths that are
* <= 2x the original image width to avoid pointless upscaling.
*/
function generateSrcSet(src, originalWidth, quality = 75) {
	const widths = RESPONSIVE_WIDTHS.filter((w) => w <= originalWidth * 2);
	if (widths.length === 0) return `${imageOptimizationUrl(src, originalWidth, quality)} ${originalWidth}w`;
	return widths.map((w) => `${imageOptimizationUrl(src, w, quality)} ${w}w`).join(", ");
}
var Image$1 = (0, import_react.forwardRef)(function Image({ src: srcProp, alt, width, height, fill, priority, quality, placeholder, blurDataURL, loader, sizes, className, style, onLoad, onLoadingComplete, onError, unoptimized: _unoptimized, overrideSrc: _overrideSrc, loading, ...rest }, ref) {
	const lastLoadedSrcRef = (0, import_react.useRef)(void 0);
	const lastErrorSrcRef = (0, import_react.useRef)(void 0);
	const didInsertRef = (0, import_react.useRef)(false);
	const imgElementRef = (0, import_react.useRef)(null);
	const mergedRef = useMergedRef(ref, imgElementRef);
	const onLoadRef = (0, import_react.useRef)(onLoad);
	(0, import_react.useEffect)(() => {
		onLoadRef.current = onLoad;
	}, [onLoad]);
	const onErrorRef = (0, import_react.useRef)(onError);
	(0, import_react.useEffect)(() => {
		onErrorRef.current = onError;
	}, [onError]);
	const onLoadingCompleteRef = (0, import_react.useRef)(onLoadingComplete);
	(0, import_react.useEffect)(() => {
		onLoadingCompleteRef.current = onLoadingComplete;
	}, [onLoadingComplete]);
	const { src, width: imgWidth, height: imgHeight, blurDataURL: imgBlurDataURL } = resolveImageSource({
		src: srcProp,
		width,
		height,
		blurDataURL
	});
	useNonWarningLayoutEffect(() => {
		if (!didInsertRef.current && imgElementRef.current !== null) {
			const img = imgElementRef.current;
			if (onErrorRef.current) img.src = img.src;
			if (img.complete && img.naturalWidth > 0) {
				const currentOnLoad = onLoadRef.current;
				const currentOnLoadingComplete = onLoadingCompleteRef.current;
				if (currentOnLoad || currentOnLoadingComplete) {
					if (lastLoadedSrcRef.current !== src) {
						lastLoadedSrcRef.current = src;
						const syntheticEvent = createSyntheticLoadEvent(img);
						currentOnLoad?.(syntheticEvent);
						currentOnLoadingComplete?.(img);
					}
				}
			}
			didInsertRef.current = true;
		}
	}, [
		placeholder,
		sizes,
		_unoptimized
	]);
	const handleLoad = onLoadingComplete ? (e) => {
		if (lastLoadedSrcRef.current === src) return;
		lastLoadedSrcRef.current = src;
		onLoad?.(e);
		onLoadingComplete(e.currentTarget);
	} : onLoad ? (e) => {
		if (lastLoadedSrcRef.current === src) return;
		lastLoadedSrcRef.current = src;
		onLoad(e);
	} : void 0;
	const handleError = onError ? (e) => {
		if (lastErrorSrcRef.current === src) return;
		lastErrorSrcRef.current = src;
		onError(e);
	} : void 0;
	if (loader) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		ref: mergedRef,
		src: loader({
			src,
			width: imgWidth ?? 0,
			quality: quality ?? 75
		}),
		alt,
		width: fill ? void 0 : imgWidth,
		height: fill ? void 0 : imgHeight,
		loading: priority ? "eager" : loading ?? "lazy",
		decoding: "async",
		sizes,
		className,
		onLoad: handleLoad,
		onError: handleError,
		style: fill ? {
			position: "absolute",
			inset: 0,
			width: "100%",
			height: "100%",
			objectFit: "cover",
			...style
		} : style,
		...rest
	});
	if (isRemoteUrl(src)) {
		const validation = validateRemoteUrl(src);
		if (!validation.allowed) {
			console.error(`[next/image] ${validation.reason}`);
			return null;
		}
		const sanitizedBlur = imgBlurDataURL ? sanitizeBlurDataURL(imgBlurDataURL) : void 0;
		const bg = placeholder === "blur" && sanitizedBlur ? `url(${sanitizedBlur})` : void 0;
		if (fill) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$2, {
			src,
			alt,
			layout: "fullWidth",
			loading: priority ? "eager" : loading ?? "lazy",
			fetchPriority: priority ? "high" : void 0,
			sizes,
			className,
			background: bg,
			onLoad: handleLoad,
			onError: handleError,
			ref: mergedRef
		});
		if (imgWidth && imgHeight) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$2, {
			src,
			alt,
			width: imgWidth,
			height: imgHeight,
			layout: "constrained",
			loading: priority ? "eager" : loading ?? "lazy",
			fetchPriority: priority ? "high" : void 0,
			sizes,
			className,
			background: bg,
			onLoad: handleLoad,
			onError: handleError,
			ref: mergedRef
		});
	}
	const imgQuality = quality ?? 75;
	const isSvg = src.endsWith(".svg");
	const skipOptimization = _unoptimized === true || isSvg && true;
	const srcSet = imgWidth && !fill && !skipOptimization ? generateSrcSet(src, imgWidth, imgQuality) : imgWidth && !fill ? RESPONSIVE_WIDTHS.filter((w) => w <= imgWidth * 2).map((w) => `${src} ${w}w`).join(", ") || `${src} ${imgWidth}w` : void 0;
	const optimizedSrc = skipOptimization ? src : imgWidth ? imageOptimizationUrl(src, imgWidth, imgQuality) : imageOptimizationUrl(src, RESPONSIVE_WIDTHS[0], imgQuality);
	const sanitizedLocalBlur = imgBlurDataURL ? sanitizeBlurDataURL(imgBlurDataURL) : void 0;
	const blurStyle = placeholder === "blur" && sanitizedLocalBlur ? {
		backgroundImage: `url(${sanitizedLocalBlur})`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center"
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		ref: mergedRef,
		src: optimizedSrc,
		alt,
		width: fill ? void 0 : imgWidth,
		height: fill ? void 0 : imgHeight,
		loading: priority ? "eager" : loading ?? "lazy",
		fetchPriority: priority ? "high" : void 0,
		decoding: "async",
		srcSet,
		sizes: sizes ?? (fill ? "100vw" : void 0),
		className,
		"data-nimg": fill ? "fill" : "1",
		onLoad: handleLoad,
		onError: handleError,
		style: fill ? {
			position: "absolute",
			inset: 0,
			width: "100%",
			height: "100%",
			objectFit: "cover",
			...blurStyle,
			...style
		} : {
			...blurStyle,
			...style
		},
		...rest
	});
});
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileText = createLucideIcon("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Image = createLucideIcon("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Link2 = createLucideIcon("link-2", [
	["path", {
		d: "M9 17H7A5 5 0 0 1 7 7h2",
		key: "8i5ue5"
	}],
	["path", {
		d: "M15 7h2a5 5 0 1 1 0 10h-2",
		key: "1b9ql8"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "12",
		y2: "12",
		key: "1jonct"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Mic = createLucideIcon("mic", [
	["path", {
		d: "M12 19v3",
		key: "npa21l"
	}],
	["path", {
		d: "M19 10v2a7 7 0 0 1-14 0v-2",
		key: "1vc78b"
	}],
	["rect", {
		x: "9",
		y: "2",
		width: "6",
		height: "13",
		rx: "3",
		key: "s6n7sd"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Paperclip = createLucideIcon("paperclip", [["path", {
	d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
	key: "1miecu"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SendHorizontal = createLucideIcon("send-horizontal", [["path", {
	d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
	key: "117uat"
}], ["path", {
	d: "M6 12h16",
	key: "s4cdu5"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region app/components/MarketIntelligenceSurface.tsx
var validationOptions = [
	["google_trends", "Google Trends"],
	["retailer_reviews", "Retailer reviews"],
	["supplier_stock", "Supplier stock"],
	["regulatory", "Regulatory review"],
	["competition", "Competition check"]
];
var blankOverview = {
	ok: true,
	connection: {
		state: "degraded",
		message: "Espacios Intelligence is checking its evidence services."
	},
	activity: {
		recentAnalyses: 0,
		sourcesReviewed: 0
	},
	freshness: {
		latestAnalysisAt: null,
		checkedAt: (/* @__PURE__ */ new Date()).toISOString()
	},
	watchlist: [],
	recentSearches: [],
	permissions: {
		canSearch: false,
		canEdit: false
	}
};
function isOverview(value) {
	return Boolean(value && typeof value === "object" && "connection" in value && "watchlist" in value);
}
function aetherHref(item) {
	const evidence = [
		`${item.evidenceCount} cited public sources`,
		`${item.independentSourceCount} independent domains`,
		item.recentMentions ? `${item.recentMentions} recent mentions` : "",
		item.freshnessDays !== null ? `freshest evidence ${item.freshnessDays} days old` : "source dates need review"
	].filter(Boolean).join(", ");
	const prompt = [
		"Evaluate this saved market opportunity using the available evidence.",
		`Brand: ${item.brand}`,
		`Signal: ${item.title}`,
		`Source: ${item.source}`,
		`Directional signal score: ${item.score}/100`,
		`Observed evidence: ${evidence || "limited evidence"}`,
		`Espacios analysis: ${item.summary}`,
		"Separate observed facts from estimates. Do not claim profitability. Recommend the next validation steps for demand, supplier viability, authenticity, compliance, unit economics and competition."
	].join("\n");
	return `/aether?${new URLSearchParams({
		prompt,
		tool: "Market Intelligence"
	}).toString()}`;
}
function ScoreRing({ score, confidence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "market-score",
		style: { "--market-score": `${Math.max(0, Math.min(100, score)) * 3.6}deg` },
		"aria-label": `Directional signal score ${score} out of 100, ${confidence} evidence confidence`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: score }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "signal" })] })
	});
}
function SourceMark({ source }) {
	const labels = {
		web: "Web",
		news: "News",
		research: "Research",
		meta: "Meta",
		tiktok: "TikTok"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `market-source-mark is-${source}`,
		"aria-label": `${labels[source]} evidence`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), labels[source]]
	});
}
function MarketIntelligenceSurface({ data, canEdit, onNotice }) {
	const [overview, setOverview] = (0, import_react.useState)(isOverview(data) ? data : blankOverview);
	const [tab, setTab] = (0, import_react.useState)("Discovery");
	const [query, setQuery] = (0, import_react.useState)("");
	const [scope, setScope] = (0, import_react.useState)("products");
	const [maxAgeDays, setMaxAgeDays] = (0, import_react.useState)(90);
	const [limit, setLimit] = (0, import_react.useState)(8);
	const [sortBy, setSortBy] = (0, import_react.useState)("evidence");
	const [results, setResults] = (0, import_react.useState)([]);
	const [searchState, setSearchState] = (0, import_react.useState)("idle");
	const [searchMessage, setSearchMessage] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(overview.watchlist[0]?.id || "");
	const effectiveCanEdit = canEdit && overview.permissions.canEdit;
	const searchEnabled = effectiveCanEdit && overview.permissions.canSearch;
	const validationReady = overview.watchlist.filter((item) => item.stage === "validating" || item.stage === "approved").length;
	const selected = overview.watchlist.find((item) => item.id === selectedId) || overview.watchlist[0] || null;
	const submitSearch = async (event) => {
		event.preventDefault();
		if (!searchEnabled || query.trim().length < 2 || searchState === "searching") return;
		setSearchState("searching");
		setSearchMessage("");
		try {
			const response = await workspaceApiFetch("/api/intelligence/search", {
				method: "POST",
				body: JSON.stringify({
					query,
					scope,
					maxAgeDays,
					limit,
					sortBy
				})
			});
			setResults(response.results || []);
			setOverview((current) => ({
				...current,
				activity: {
					recentAnalyses: current.activity.recentAnalyses + 1,
					sourcesReviewed: current.activity.sourcesReviewed + (response.sourcesReviewed || 0)
				},
				freshness: {
					latestAnalysisAt: (/* @__PURE__ */ new Date()).toISOString(),
					checkedAt: (/* @__PURE__ */ new Date()).toISOString()
				}
			}));
			setSearchMessage(response.results?.length ? `${response.results.length} signals produced from ${response.sourcesReviewed || 0} public sources. ${response.summary || ""}` : "No evidence-backed signal matched this scope. Try a broader phrase or a wider evidence window.");
			setSearchState("ready");
		} catch (error) {
			setSearchMessage(error instanceof WorkspaceApiError ? error.message : "The Espacios analysis did not complete.");
			setSearchState("error");
		}
	};
	const saveSignal = async (signal) => {
		try {
			const response = await workspaceApiFetch("/api/intelligence/watchlist", {
				method: "POST",
				body: JSON.stringify(signal)
			});
			setOverview((current) => ({
				...current,
				watchlist: [response.item, ...current.watchlist.filter((item) => item.id !== response.item.id && !(item.providerItemId === response.item.providerItemId && item.source === response.item.source))]
			}));
			setSelectedId(response.item.id);
			onNotice(`${response.item.brand} was saved to the shared validation watchlist.`);
		} catch (error) {
			onNotice(error instanceof WorkspaceApiError ? error.message : "The signal could not be saved.");
		}
	};
	const updateSavedItem = (item) => {
		setOverview((current) => ({
			...current,
			watchlist: current.watchlist.map((entry) => entry.id === item.id ? item : entry)
		}));
	};
	const removeSavedItem = async (item) => {
		try {
			await workspaceApiFetch(`/api/intelligence/watchlist/${encodeURIComponent(item.id)}`, { method: "DELETE" });
			setOverview((current) => ({
				...current,
				watchlist: current.watchlist.filter((entry) => entry.id !== item.id)
			}));
			setSelectedId("");
			onNotice(`${item.brand} was removed from the watchlist.`);
		} catch (error) {
			onNotice(error instanceof WorkspaceApiError ? error.message : "The saved signal could not be removed.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "market-intelligence surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `market-connection is-${overview.connection.state}`,
				"aria-label": "Espacios Intelligence status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMark, { source: "web" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: overview.connection.state === "connected" ? "Espacios Intelligence is ready" : "Evidence services are recovering" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [overview.connection.message, " Every analysis runs only when you request it."] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/research",
						children: "Open Research →"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-metrics",
				"aria-label": "Market intelligence status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recent analyses" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: overview.activity.recentAnalyses }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "workspace requests" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sources reviewed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: overview.activity.sourcesReviewed }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "public evidence" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved signals" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: overview.watchlist.length }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "shared watchlist" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validation active" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: validationReady }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "in review or approved" })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-tabs market-tabs",
				role: "tablist",
				"aria-label": "Market Intelligence views",
				children: [
					"Discovery",
					"Watchlist",
					"Validation"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === item,
					className: tab === item ? "is-active" : "",
					onClick: () => setTab(item),
					children: [item, item === "Watchlist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: overview.watchlist.length }) : null]
				}, item))
			}),
			tab === "Discovery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-discovery",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "market-search workspace-panel",
					onSubmit: submitSearch,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "market-search-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Espacios-owned market analysis" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Turn public evidence into a decision-ready view" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Espacios collects relevant web, news and research evidence, synthesizes it with its own AI, and shows exactly how strong each signal is." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "market-query",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search phrase" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "centella serum, barrier repair, dark spots…",
								maxLength: 240
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "market-filter-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analysis scope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: scope,
									onChange: (event) => setScope(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "products",
											children: "Product demand"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "competitors",
											children: "Competition"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "creative",
											children: "Creative hooks"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "claims",
											children: "Product claims"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: maxAgeDays,
									onChange: (event) => setMaxAgeDays(Number(event.target.value)),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 30,
											children: "Last 30 days"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 90,
											children: "Last 90 days"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 365,
											children: "Last year"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 0,
											children: "All available dates"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rank by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sortBy,
									onChange: (event) => setSortBy(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "evidence",
											children: "Evidence strength"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "recent",
											children: "Most recent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "diversity",
											children: "Source diversity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "competition",
											children: "Competition"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Result limit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: limit,
									onChange: (event) => setLimit(Number(event.target.value)),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 6,
											children: "6 results"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 8,
											children: "8 results"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 12,
											children: "12 results"
										})
									]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "workspace-primary-button",
							type: "submit",
							disabled: !searchEnabled || query.trim().length < 2 || searchState === "searching",
							children: searchState === "searching" ? "Collecting and analyzing evidence…" : "Analyze market"
						}),
						!effectiveCanEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "market-form-note",
							children: "An owner or editor can run workspace analyses."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "market-form-note",
							children: "No third-party intelligence subscription or vendor credits are used."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "market-results",
					"aria-live": "polite",
					children: [searchMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `market-search-status is-${searchState}`,
						children: searchMessage
					}) : null, results.length ? results.map((signal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketResult, {
						signal,
						saved: overview.watchlist.some((item) => item.source === signal.source && item.providerItemId === signal.providerItemId),
						canEdit: effectiveCanEdit,
						onSave: saveSignal
					}, `${signal.source}-${signal.providerItemId}`)) : searchState === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoveryStartingPoint, { onSelect: (term) => setQuery(term) }) : null]
				})]
			}) : null,
			tab === "Watchlist" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "market-watchlist",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Shared workspace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Opportunity watchlist" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [overview.watchlist.length, " saved"] })] }), overview.watchlist.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "market-watchlist-table",
					role: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "market-watchlist-head",
						role: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Signal" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stage" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Action" })
						]
					}), overview.watchlist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "market-watchlist-row",
						role: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "cell",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMark, { source: item.source }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.brand }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
									score: item.score,
									confidence: item.confidence
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.evidenceCount,
									" sources · ",
									item.independentSourceCount,
									" domains"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								role: "cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `market-stage is-${item.stage}`,
									children: item.stage
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "cell",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSelectedId(item.id);
										setTab("Validation");
									},
									children: "Validate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									href: aetherHref(item),
									children: "Ask Aether"
								})]
							})
						]
					}, item.id))]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketEmpty, {
					title: "No saved opportunities",
					copy: "Run a live discovery search, then save the signals worth validating with independent evidence.",
					action: () => setTab("Discovery")
				})]
			}) : null,
			tab === "Validation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "market-validation",
				children: overview.watchlist.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Saved opportunities",
					children: overview.watchlist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: selected?.id === item.id ? "is-active" : "",
						type: "button",
						onClick: () => setSelectedId(item.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMark, { source: item.source }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.brand }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.title })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: item.score })
						]
					}, item.id))
				}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValidationEditor, {
					item: selected,
					canEdit: effectiveCanEdit,
					onSaved: updateSavedItem,
					onRemoved: removeSavedItem,
					onNotice
				}, selected.id) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketEmpty, {
					title: "Nothing to validate yet",
					copy: "Save a discovery result first. Its observed signals and source will remain attached to the validation record.",
					action: () => setTab("Discovery")
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "market-disclaimer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Directional intelligence, not financial proof." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Espacios makes its own analysis from cited public web, news and research evidence. Source volume and freshness can indicate market attention, but they do not establish revenue, profit, authenticity, compliance or supplier availability." })]
			})
		]
	});
}
function DiscoveryStartingPoint({ onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "market-starting-point",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Analysis starting point" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Begin with one customer problem or product phrase" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Espacios will compare public sources, identify patterns and keep inference separate from observed evidence." })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: [
			"centella serum",
			"glass skin",
			"barrier repair",
			"rice serum",
			"dark spots"
		].map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onSelect(term),
			children: term
		}, term)) })]
	});
}
function MarketResult({ signal, saved, canEdit, onSave }) {
	const [saving, setSaving] = (0, import_react.useState)(false);
	const evidence = [
		[String(signal.evidenceCount), "cited sources"],
		[String(signal.independentSourceCount), "independent domains"],
		[String(signal.recentMentions), "recent mentions"],
		[signal.freshnessDays === null ? "Review" : `${signal.freshnessDays}d`, "freshest evidence"]
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "market-result-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
				score: signal.score,
				confidence: signal.confidence
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-result-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMark, { source: signal.source }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: signal.status }),
						signal.country ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: signal.country }) : null
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: signal.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: signal.brand }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: signal.summary }),
					signal.scoreReasons.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: signal.scoreReasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reason }, reason)) }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "market-result-evidence",
				children: evidence.map(([metric, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: metric }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: label })] }, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-result-actions",
				children: [
					signal.landingUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: signal.landingUrl,
						target: "_blank",
						rel: "noreferrer",
						children: "Open primary source"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: aetherHref(signal),
						children: "Analyze with Aether"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canEdit || saved || saving,
						onClick: async () => {
							setSaving(true);
							await onSave(signal);
							setSaving(false);
						},
						children: saved ? "Saved" : saving ? "Saving…" : "Save signal"
					})
				]
			})
		]
	});
}
function MarketEmpty({ title, copy, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "market-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: action,
				children: "Open discovery"
			})
		]
	});
}
function ValidationEditor({ item, canEdit, onSaved, onRemoved, onNotice }) {
	const [stage, setStage] = (0, import_react.useState)(item.stage);
	const [retailPrice, setRetailPrice] = (0, import_react.useState)(item.retailPrice?.toString() || "");
	const [supplierCost, setSupplierCost] = (0, import_react.useState)(item.supplierCost?.toString() || "");
	const [checks, setChecks] = (0, import_react.useState)(item.validationChecks);
	const [notes, setNotes] = (0, import_react.useState)(item.notes);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const margin = (0, import_react.useMemo)(() => {
		const retail = Number(retailPrice);
		const cost = Number(supplierCost);
		return Number.isFinite(retail) && retail > 0 && Number.isFinite(cost) && cost >= 0 ? Math.round((retail - cost) / retail * 100) : null;
	}, [retailPrice, supplierCost]);
	const save = async (event) => {
		event.preventDefault();
		if (!canEdit || saving) return;
		setSaving(true);
		try {
			const response = await workspaceApiFetch(`/api/intelligence/watchlist/${encodeURIComponent(item.id)}`, {
				method: "PATCH",
				body: JSON.stringify({
					stage,
					retailPrice,
					supplierCost,
					validationChecks: checks,
					notes
				})
			});
			onSaved(response.item);
			onNotice(`${response.item.brand} validation was saved for the workspace.`);
		} catch (error) {
			onNotice(error instanceof WorkspaceApiError ? error.message : "The validation record could not be saved.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "market-validation-editor",
		onSubmit: save,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMark, { source: item.source }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Evidence review" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: item.brand }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
				score: item.score,
				confidence: item.confidence
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-observed-evidence",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed signals" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Sources" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.evidenceCount })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Independent domains" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.independentSourceCount })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Recent mentions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.recentMentions })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Confidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.confidence })] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validation stage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: stage,
				disabled: !canEdit,
				onChange: (event) => setStage(event.target.value),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "watching",
						children: "Watching"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "validating",
						children: "Validating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "approved",
						children: "Approved for next step"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "rejected",
						children: "Rejected"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-unit-economics",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retail price (USD)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						inputMode: "decimal",
						min: "0",
						step: "0.01",
						value: retailPrice,
						disabled: !canEdit,
						onChange: (event) => setRetailPrice(event.target.value),
						placeholder: "49.00"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Supplier cost (USD)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						inputMode: "decimal",
						min: "0",
						step: "0.01",
						value: supplierCost,
						disabled: !canEdit,
						onChange: (event) => setSupplierCost(event.target.value),
						placeholder: "12.00"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gross margin signal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: margin === null ? "Add prices" : `${margin}%` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Before shipping, ads, returns and overhead" })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Independent checks" }), validationOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: checks.includes(value),
					disabled: !canEdit,
					onChange: (event) => setChecks((current) => event.target.checked ? [...new Set([...current, value])] : current.filter((check) => check !== value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })
			] }, value))] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: notes,
				disabled: !canEdit,
				onChange: (event) => setNotes(event.target.value),
				placeholder: "Record review evidence, supplier availability, competition, compliance risks and the decision rationale.",
				maxLength: 8e3
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "market-validation-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "workspace-primary-button",
						type: "submit",
						disabled: !canEdit || saving,
						children: saving ? "Saving…" : "Save validation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: aetherHref(item),
						children: "Evaluate with Aether"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "market-remove",
						type: "button",
						disabled: !canEdit,
						onClick: () => void onRemoved(item),
						children: "Remove"
					})
				]
			})
		]
	});
}
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bot = createLucideIcon("bot", [
	["path", {
		d: "M12 8V4H8",
		key: "hb8ula"
	}],
	["rect", {
		width: "16",
		height: "12",
		x: "4",
		y: "8",
		rx: "2",
		key: "enze0r"
	}],
	["path", {
		d: "M2 14h2",
		key: "vft8re"
	}],
	["path", {
		d: "M20 14h2",
		key: "4cs60a"
	}],
	["path", {
		d: "M15 13v2",
		key: "1xurst"
	}],
	["path", {
		d: "M9 13v2",
		key: "rq6x2g"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Boxes = createLucideIcon("boxes", [
	["path", {
		d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
		key: "lc1i9w"
	}],
	["path", {
		d: "m7 16.5-4.74-2.85",
		key: "1o9zyk"
	}],
	["path", {
		d: "m7 16.5 5-3",
		key: "va8pkn"
	}],
	["path", {
		d: "M7 16.5v5.17",
		key: "jnp8gn"
	}],
	["path", {
		d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
		key: "8zsnat"
	}],
	["path", {
		d: "m17 16.5-5-3",
		key: "8arw3v"
	}],
	["path", {
		d: "m17 16.5 4.74-2.85",
		key: "8rfmw"
	}],
	["path", {
		d: "M17 16.5v5.17",
		key: "k6z78m"
	}],
	["path", {
		d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
		key: "1xygjf"
	}],
	["path", {
		d: "M12 8 7.26 5.15",
		key: "1vbdud"
	}],
	["path", {
		d: "m12 8 4.74-2.85",
		key: "3rx089"
	}],
	["path", {
		d: "M12 13.5V8",
		key: "1io7kd"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BrainCircuit = createLucideIcon("brain-circuit", [
	["path", {
		d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
		key: "l5xja"
	}],
	["path", {
		d: "M9 13a4.5 4.5 0 0 0 3-4",
		key: "10igwf"
	}],
	["path", {
		d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
		key: "105sqy"
	}],
	["path", {
		d: "M3.477 10.896a4 4 0 0 1 .585-.396",
		key: "ql3yin"
	}],
	["path", {
		d: "M6 18a4 4 0 0 1-1.967-.516",
		key: "2e4loj"
	}],
	["path", {
		d: "M12 13h4",
		key: "1ku699"
	}],
	["path", {
		d: "M12 18h6a2 2 0 0 1 2 2v1",
		key: "105ag5"
	}],
	["path", {
		d: "M12 8h8",
		key: "1lhi5i"
	}],
	["path", {
		d: "M16 8V5a2 2 0 0 1 2-2",
		key: "u6izg6"
	}],
	["circle", {
		cx: "16",
		cy: "13",
		r: ".5",
		key: "ry7gng"
	}],
	["circle", {
		cx: "18",
		cy: "3",
		r: ".5",
		key: "1aiba7"
	}],
	["circle", {
		cx: "20",
		cy: "21",
		r: ".5",
		key: "yhc1fs"
	}],
	["circle", {
		cx: "20",
		cy: "8",
		r: ".5",
		key: "1e43v0"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CalendarDays = createLucideIcon("calendar-days", [
	["path", {
		d: "M8 2v3",
		key: "1ioesn"
	}],
	["path", {
		d: "M16 2v3",
		key: "otl347"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M8 13h.01",
		key: "1sbv64"
	}],
	["path", {
		d: "M12 13h.01",
		key: "y0uutt"
	}],
	["path", {
		d: "M16 13h.01",
		key: "wip0gl"
	}],
	["path", {
		d: "M8 17h.01",
		key: "p3bg7i"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}],
	["path", {
		d: "M16 17h.01",
		key: "ql8jdd"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Circle = createLucideIcon("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ContactRound = createLucideIcon("contact-round", [
	["path", {
		d: "M16 2v2",
		key: "scm5qe"
	}],
	["path", {
		d: "M17.915 21a6 6 0 10-12 0",
		key: "13n4mv"
	}],
	["path", {
		d: "M8 2v2",
		key: "pbkmx"
	}],
	["circle", {
		cx: "12",
		cy: "11",
		r: "4",
		key: "1gt34v"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Database = createLucideIcon("database", [
	["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}],
	["path", {
		d: "M3 5V19A9 3 0 0 0 21 19V5",
		key: "1wlel7"
	}],
	["path", {
		d: "M3 12A9 3 0 0 0 21 12",
		key: "mv7ke4"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Files = createLucideIcon("files", [
	["path", {
		d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8",
		key: "14sh0y"
	}],
	["path", {
		d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
		key: "1970lx"
	}],
	["path", {
		d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1",
		key: "l4dndm"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Inbox = createLucideIcon("inbox", [["polyline", {
	points: "22 12 16 12 14 15 10 15 8 12 2 12",
	key: "o97t9d"
}], ["path", {
	d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	key: "oot6mr"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Layers = createLucideIcon("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lightbulb = createLucideIcon("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ListChecks = createLucideIcon("list-checks", [
	["path", {
		d: "M13 5h8",
		key: "a7qcls"
	}],
	["path", {
		d: "M13 12h8",
		key: "h98zly"
	}],
	["path", {
		d: "M13 19h8",
		key: "c3s6r1"
	}],
	["path", {
		d: "m3 17 2 2 4-4",
		key: "1jhpwq"
	}],
	["path", {
		d: "m3 7 2 2 4-4",
		key: "1obspn"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Mail = createLucideIcon("mail", [["path", {
	d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
	key: "132q7q"
}], ["rect", {
	x: "2",
	y: "4",
	width: "20",
	height: "16",
	rx: "2",
	key: "izxlao"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPinned = createLucideIcon("map-pinned", [
	["path", {
		d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
		key: "11u0oz"
	}],
	["circle", {
		cx: "12",
		cy: "8",
		r: "2",
		key: "1822b1"
	}],
	["path", {
		d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
		key: "q8zwxj"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Megaphone = createLucideIcon("megaphone", [
	["path", {
		d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
		key: "q8bfy3"
	}],
	["path", {
		d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",
		key: "1853fq"
	}],
	["path", {
		d: "M8 6v8",
		key: "15ugcq"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var NotebookPen = createLucideIcon("notebook-pen", [
	["path", {
		d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4",
		key: "re6nr2"
	}],
	["path", {
		d: "M2 6h4",
		key: "aawbzj"
	}],
	["path", {
		d: "M2 10h4",
		key: "l0bgd4"
	}],
	["path", {
		d: "M2 14h4",
		key: "1gsvsf"
	}],
	["path", {
		d: "M2 18h4",
		key: "1bu2t1"
	}],
	["path", {
		d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
		key: "pqwjuv"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PlugZap = createLucideIcon("plug-zap", [
	["path", {
		d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
		key: "goz73y"
	}],
	["path", {
		d: "m2 22 3-3",
		key: "19mgm9"
	}],
	["path", {
		d: "M7.5 13.5 10 11",
		key: "7xgeeb"
	}],
	["path", {
		d: "M10.5 16.5 13 14",
		key: "10btkg"
	}],
	["path", {
		d: "m18 3-4 4h6l-4 4",
		key: "16psg9"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ScanSearch = createLucideIcon("scan-search", [
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "m16 16-1.9-1.9",
		key: "1dq9hf"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserRoundSearch = createLucideIcon("user-round-search", [
	["circle", {
		cx: "10",
		cy: "8",
		r: "5",
		key: "o932ke"
	}],
	["path", {
		d: "M2 21a8 8 0 0 1 10.434-7.62",
		key: "1yezr2"
	}],
	["circle", {
		cx: "18",
		cy: "18",
		r: "3",
		key: "1xkwt0"
	}],
	["path", {
		d: "m22 22-1.9-1.9",
		key: "1e5ubv"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UsersRound = createLucideIcon("users-round", [
	["path", {
		d: "M18 21a8 8 0 0 0-16 0",
		key: "3ypg7q"
	}],
	["circle", {
		cx: "10",
		cy: "8",
		r: "5",
		key: "o932ke"
	}],
	["path", {
		d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
		key: "10s06x"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WalletCards = createLucideIcon("wallet-cards", [
	["path", {
		d: "M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21",
		key: "1vwh6y"
	}],
	["path", {
		d: "M3 7h18",
		key: "1uiuf2"
	}],
	["rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2",
		key: "h1oib"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Workflow = createLucideIcon("workflow", [
	["rect", {
		width: "8",
		height: "8",
		x: "3",
		y: "3",
		rx: "2",
		key: "by2w9f"
	}],
	["path", {
		d: "M7 11v4a2 2 0 0 0 2 2h4",
		key: "xkn7yn"
	}],
	["rect", {
		width: "8",
		height: "8",
		x: "13",
		y: "13",
		rx: "2",
		key: "1cgmvn"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
//#endregion
//#region app/components/MinimalIcon.tsx
var iconMap = {
	aether: Bot,
	plans: ListChecks,
	planning: ListChecks,
	research: Search,
	learn: createLucideIcon("book-open", [["path", {
		d: "M12 5v16",
		key: "1f6ucr"
	}], ["path", {
		d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
		key: "1fyvmf"
	}]]),
	leads: UserRoundSearch,
	socials: CalendarDays,
	create: Megaphone,
	ops: Workflow,
	mail: Mail,
	crm: ContactRound,
	intelligence: BrainCircuit,
	documents: Files,
	database: Database,
	spaces: MapPinned,
	teams: UsersRound,
	plug: PlugZap,
	inbox: Inbox,
	notes: NotebookPen,
	expenses: WalletCards,
	scraper: ScanSearch,
	calendar: CalendarDays,
	settings: Settings,
	customize: SlidersHorizontal,
	menu: Menu,
	grow: TrendingUp,
	workspace: Layers,
	tools: Boxes,
	growth: TrendingUp,
	ideas: Lightbulb,
	sparkle: Sparkles
};
function MinimalIcon({ name, className = "" }) {
	const Icon = iconMap[name] || Circle;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `minimal-icon ${className}`.trim(),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			size: 20,
			strokeWidth: 1.75,
			focusable: "false"
		})
	});
}
//#endregion
//#region app/components/WorkspaceApp.tsx
var surfaceCopy = {
	aether: {
		title: "Aether",
		eyebrow: "AI operating space",
		intro: "Think, plan and move work forward with your workspace context attached."
	},
	plans: {
		title: "Plans",
		eyebrow: "Strategy and execution",
		intro: "Turn an outcome into milestones, tasks, artifacts and accountable next steps."
	},
	research: {
		title: "Research",
		eyebrow: "Evidence workspace",
		intro: "Investigate the web and your documents, then keep the useful findings close."
	},
	learn: {
		title: "Learn",
		eyebrow: "AI-powered learning",
		intro: "Build practical skills with courses, guided progress and an always-on teacher."
	},
	leads: {
		title: "Leads",
		eyebrow: "Campaign intelligence",
		intro: "Follow lead volume, qualification and conversion from first touch to won work."
	},
	socials: {
		title: "Socials",
		eyebrow: "Content workspace",
		intro: "Plan, create and review publishing activity across your connected channels."
	},
	ops: {
		title: "Ops",
		eyebrow: "Operations and systems",
		intro: "See active processes, automation health and the work your systems are saving."
	},
	mail: {
		title: "Mail",
		eyebrow: "Email growth",
		intro: "Run contacts, campaigns, automations and deliverability from one calm workspace."
	},
	crm: {
		title: "CRM",
		eyebrow: "Pipeline intelligence",
		intro: "Keep contacts, deals, activities and next actions visible to the whole team."
	},
	intelligence: {
		title: "Market Intelligence",
		eyebrow: "Commerce and creative signals",
		intro: "Find durable demand signals, save the evidence and validate opportunities before making a commercial decision."
	},
	account: {
		title: "Account",
		eyebrow: "Workspace settings",
		intro: "Review your profile, access, plan and connected workspace session in one place."
	}
};
var preOnboardingHomeCopy = {
	title: "Workspace",
	eyebrow: "Connected business workspace",
	intro: "Sign in to reconnect your plans, research, marketing, sales and operations."
};
var endpoints = {
	aether: ["/api/chat", "/api/workspace/kernel/bootstrap"],
	plans: ["/api/account/plans"],
	research: ["/api/research/list"],
	learn: ["/api/learn/catalog"],
	leads: ["/api/leads/overview"],
	socials: ["/api/socials/list"],
	ops: ["/api/operations", "/api/workflow/list"],
	mail: ["/api/email/stats", "/api/email/campaigns"],
	crm: ["/api/crm/list"],
	intelligence: ["/api/intelligence/overview"]
};
var workspaceSidebarCatalog = [...workspaceNavigation.map((item) => ({
	...item,
	id: `core:${item.surface}`,
	description: surfaceCopy[item.surface].intro,
	locked: item.surface === "aether"
})), ...secondaryNavigation.map((item) => ({
	...item,
	id: `tool:${item.href}`,
	surface: item.href === "/intelligence" ? "intelligence" : void 0
}))];
var defaultSidebarOrder = workspaceSidebarCatalog.map((item) => item.id);
var defaultSidebarVisible = workspaceNavigation.map((item) => `core:${item.surface}`);
var sidebarPreferenceKey = "espacios_workspace_sidebar_v1";
var bootstrapCacheKey = "espacios_workspace_bootstrap_v3";
var bootstrapCacheTtl = 300 * 1e3;
var memoryBootstrap = null;
function cachedWorkspaceBootstrap() {
	if (memoryBootstrap?.authenticated) return memoryBootstrap;
	try {
		const cached = asRecord(JSON.parse(window.sessionStorage.getItem(bootstrapCacheKey) || "null"));
		const profile = asRecord(cached.profile);
		const cachedAt = Number(cached.cachedAt);
		if (profile.authenticated && Number.isFinite(cachedAt) && Date.now() - cachedAt < bootstrapCacheTtl) {
			memoryBootstrap = profile;
			return profile;
		}
	} catch {}
	return null;
}
function cacheWorkspaceBootstrap(profile) {
	memoryBootstrap = profile.authenticated ? profile : null;
	try {
		if (profile.authenticated) window.sessionStorage.setItem(bootstrapCacheKey, JSON.stringify({
			cachedAt: Date.now(),
			profile
		}));
		else window.sessionStorage.removeItem(bootstrapCacheKey);
	} catch {}
}
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function arraysFrom(value) {
	if (Array.isArray(value)) return value.map(asRecord);
	const root = asRecord(value);
	const priority = [
		"items",
		"results",
		"plans",
		"research",
		"reports",
		"feeds",
		"courses",
		"lessons",
		"workflows",
		"operations",
		"campaigns",
		"contacts",
		"deals",
		"messages",
		"projects"
	];
	for (const key of priority) if (Array.isArray(root[key])) return root[key].map(asRecord);
	for (const wrapper of [
		"data",
		"learning",
		"workspace"
	]) {
		const nested = asRecord(root[wrapper]);
		for (const key of priority) if (Array.isArray(nested[key])) return nested[key].map(asRecord);
	}
	return [];
}
function value(row, keys, fallback = "") {
	for (const key of keys) {
		const candidate = row[key];
		if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
		if (typeof candidate === "number") return String(candidate);
	}
	return fallback;
}
function numberValue(source, keys, fallback = 0) {
	const row = asRecord(source);
	for (const key of keys) {
		const parsed = Number(row[key]);
		if (Number.isFinite(parsed)) return parsed;
	}
	return fallback;
}
function WorkspaceIcon({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinimalIcon, {
		name,
		className: `workspace-icon workspace-icon-${name}`
	});
}
function aetherPromptHref(prompt, tool) {
	const params = new URLSearchParams({ prompt });
	if (tool) params.set("tool", tool);
	return `/aether?${params.toString()}`;
}
function artifactId(row) {
	return value(row, [
		"id",
		"artifact_id",
		"report_id",
		"plan_id"
	]);
}
function updateArtifactLocation(id, mode = "push") {
	const url = new URL(window.location.href);
	if (id) url.searchParams.set("id", id);
	else url.searchParams.delete("id");
	window.history[mode === "push" ? "pushState" : "replaceState"]({}, "", `${url.pathname}${url.search}${url.hash}`);
}
function artifactFilename(title) {
	return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "espacios-file"}.pdf`;
}
async function downloadArtifactPdf(title, markdown, kind, sources = []) {
	const response = await workspaceApiResponseFetch("/api/account/pdf", {
		method: "POST",
		body: JSON.stringify({
			title,
			markdown,
			kind,
			sources
		})
	});
	if (!(response.headers.get("content-type") || "").includes("application/pdf")) throw new Error("pdf_unavailable");
	const href = URL.createObjectURL(await response.blob());
	const anchor = document.createElement("a");
	anchor.href = href;
	anchor.download = artifactFilename(title);
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	window.setTimeout(() => URL.revokeObjectURL(href), 1500);
}
async function persistPendingPlanSelection() {
	try {
		const raw = window.sessionStorage.getItem("espacios_plan_selection");
		const params = new URLSearchParams(window.location.search);
		const pending = raw ? asRecord(JSON.parse(raw)) : {
			tier: params.get("plan"),
			billingCycle: params.get("billing") || "monthly"
		};
		const tier = value(pending, ["tier"]);
		const billingCycle = value(pending, ["billingCycle"], "monthly");
		if (!new Set([
			"starter",
			"growth",
			"pro",
			"enterprise"
		]).has(tier)) return null;
		const selection = asRecord(asRecord(await workspaceApiFetch("/api/account/plan-selection", {
			method: "PUT",
			body: JSON.stringify({
				tier,
				billingCycle
			})
		})).selection);
		window.sessionStorage.removeItem("espacios_plan_selection");
		return Object.keys(selection).length ? selection : null;
	} catch {
		return null;
	}
}
function WorkspaceApp({ surface }) {
	const [bootstrap, setBootstrap] = (0, import_react.useState)(null);
	const [state, setState] = (0, import_react.useState)("loading");
	const [payloads, setPayloads] = (0, import_react.useState)([]);
	const [drawer, setDrawer] = (0, import_react.useState)(false);
	const [more, setMore] = (0, import_react.useState)(false);
	const [customizingSidebar, setCustomizingSidebar] = (0, import_react.useState)(false);
	const [sidebarReady, setSidebarReady] = (0, import_react.useState)(false);
	const [sidebarOrder, setSidebarOrder] = (0, import_react.useState)(defaultSidebarOrder);
	const [sidebarVisible, setSidebarVisible] = (0, import_react.useState)(defaultSidebarVisible);
	const [notice, setNotice] = (0, import_react.useState)("");
	const moreRef = (0, import_react.useRef)(null);
	const load = (0, import_react.useCallback)(async () => {
		if (!memoryBootstrap) setState("loading");
		try {
			const cachedProfile = cachedWorkspaceBootstrap();
			if (cachedProfile) setBootstrap(cachedProfile);
			const surfaceRequests = storedAccessToken() ? Promise.allSettled((endpoints[surface] || []).map((path) => workspaceApiFetch(path))) : null;
			const profile = await workspaceApiFetch("/api/app/bootstrap");
			cacheWorkspaceBootstrap(profile);
			if (!profile.authenticated) {
				setBootstrap(profile);
				setState("denied");
				return;
			}
			const selectedPlan = await persistPendingPlanSelection();
			setBootstrap(selectedPlan ? {
				...profile,
				plan: selectedPlan
			} : profile);
			const settled = await (surfaceRequests || Promise.allSettled((endpoints[surface] || []).map((path) => workspaceApiFetch(path))));
			const completed = settled.filter((item) => item.status === "fulfilled").map((item) => item.value);
			if (!completed.length && settled.length) {
				if (surface === "learn") {
					setPayloads([]);
					setNotice("The course catalog is available. Learning progress will reconnect when the provider is available.");
					setState("ready");
					return;
				}
				setState((settled[0].status === "rejected" ? String(settled[0].reason) : "request_failed").includes("denied") ? "denied" : "error");
				return;
			}
			setPayloads(completed);
			setState("ready");
		} catch (error) {
			const reason = String(error);
			setState(reason.includes("unauthorized") || reason.includes("denied") ? "denied" : "error");
		}
	}, [surface]);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	(0, import_react.useEffect)(() => startWorkspaceSessionMaintenance(), []);
	(0, import_react.useEffect)(() => {
		const frame = window.requestAnimationFrame(() => {
			try {
				const saved = asRecord(JSON.parse(window.localStorage.getItem(sidebarPreferenceKey) || "null"));
				const savedOrder = Array.isArray(saved.order) ? saved.order.map(String) : [];
				const savedVisible = Array.isArray(saved.visible) ? saved.visible.map(String) : [];
				const known = new Set(defaultSidebarOrder);
				const order = [...new Set([...savedOrder.filter((id) => known.has(id)), ...defaultSidebarOrder])];
				const visible = [...new Set(savedVisible.filter((id) => known.has(id)))];
				setSidebarOrder(order);
				setSidebarVisible(visible.length ? [...new Set(["core:aether", ...visible])] : defaultSidebarVisible);
			} catch {
				setSidebarOrder(defaultSidebarOrder);
				setSidebarVisible(defaultSidebarVisible);
			} finally {
				setSidebarReady(true);
			}
		});
		return () => window.cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!sidebarReady) return;
		try {
			window.localStorage.setItem(sidebarPreferenceKey, JSON.stringify({
				order: sidebarOrder,
				visible: sidebarVisible
			}));
		} catch {}
	}, [
		sidebarOrder,
		sidebarReady,
		sidebarVisible
	]);
	(0, import_react.useEffect)(() => {
		if (!more) return;
		const closeOnOutsidePress = (event) => {
			if (!moreRef.current?.contains(event.target)) setMore(false);
		};
		const closeOnEscape = (event) => {
			if (event.key === "Escape") setMore(false);
		};
		document.addEventListener("pointerdown", closeOnOutsidePress);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("pointerdown", closeOnOutsidePress);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [more]);
	(0, import_react.useEffect)(() => {
		if (!customizingSidebar) return;
		const closeOnEscape = (event) => {
			if (event.key === "Escape") setCustomizingSidebar(false);
		};
		document.addEventListener("keydown", closeOnEscape);
		return () => document.removeEventListener("keydown", closeOnEscape);
	}, [customizingSidebar]);
	const role = bootstrap?.role || "viewer";
	const isConnecting = state === "loading" && !bootstrap;
	const canEdit = role === "owner" || role === "editor";
	const isOnboarded = Boolean(bootstrap?.authenticated);
	const ecosystemGlassV3 = Boolean(bootstrap?.featureFlags?.ecosystemGlassV3);
	const copy = surface === "aether" && !isOnboarded ? preOnboardingHomeCopy : surfaceCopy[surface];
	const allowedNavigation = new Set(bootstrap?.authenticated ? bootstrap.allowedNavigation : workspaceNavigation.map((item) => item.surface));
	const availableSidebarItems = workspaceSidebarCatalog.filter((item) => !item.surface || allowedNavigation.has(item.surface));
	const sidebarItemMap = new Map(availableSidebarItems.map((item) => [item.id, item]));
	const orderedSidebarItems = sidebarOrder.map((id) => sidebarItemMap.get(id)).filter((item) => Boolean(item));
	const visibleSidebarSet = new Set(sidebarVisible);
	const pinnedSidebarItems = orderedSidebarItems.filter((item) => visibleSidebarSet.has(item.id));
	const overflowSidebarItems = orderedSidebarItems.filter((item) => !visibleSidebarSet.has(item.id));
	const toggleSidebarItem = (item) => {
		if (item.locked) return;
		setSidebarVisible((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]);
	};
	const moveSidebarItem = (itemId, direction) => {
		setSidebarOrder((current) => {
			const visibleIds = current.filter((id) => visibleSidebarSet.has(id));
			const currentVisibleIndex = visibleIds.indexOf(itemId);
			const targetId = visibleIds[currentVisibleIndex + direction];
			if (currentVisibleIndex < 0 || !targetId) return current;
			const next = [...current];
			const currentIndex = next.indexOf(itemId);
			const targetIndex = next.indexOf(targetId);
			[next[currentIndex], next[targetIndex]] = [next[targetIndex], next[currentIndex]];
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `workspace-app ecosystem-glass-v3 ${ecosystemGlassV3 ? "is-rollout-enabled" : ""}`,
		"data-surface": surface,
		"data-theme-version": ecosystemGlassV3 ? "glass-v3" : "glass-v3-compatible",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "workspace-skip",
				href: "#workspace-content",
				children: "Skip to workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `workspace-sidebar ${drawer ? "is-open" : ""}`,
				"aria-label": "Workspace navigation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-brand-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "workspace-brand",
							href: "/",
							"aria-label": "Espacios home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspaciosLogo, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "workspace-close",
							type: "button",
							onClick: () => setDrawer(false),
							"aria-label": "Close navigation",
							children: "×"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "workspace-nav",
						children: pinnedSidebarItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: item.surface === surface ? "is-active" : "",
							href: item.href,
							onClick: () => setDrawer(false),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.surface === "aether" && !isOnboarded ? "Workspace" : item.label })]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `workspace-more ${more ? "is-open" : ""}`,
						ref: moreRef,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-expanded": more,
							"aria-controls": "workspace-more-menu",
							onClick: () => setMore((current) => !current),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "•••"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "More" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: more ? "−" : "+" })
							]
						}), more && overflowSidebarItems.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "workspace-more-menu",
							id: "workspace-more-menu",
							role: "menu",
							"aria-label": "More workspace tools",
							children: overflowSidebarItems.map(({ id, label, href, icon, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href,
								role: "menuitem",
								onClick: () => {
									setMore(false);
									setDrawer(false);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: description })] })]
							}, id))
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-sidebar-footer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeControl, { placement: "sidebar" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "workspace-sidebar-tools",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "workspace-customize-trigger",
									type: "button",
									onClick: () => setCustomizingSidebar(true),
									"aria-label": "Customize left panel",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "customize" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customize" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									href: "/account",
									"aria-label": "Workspace settings",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Settings" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								className: "workspace-user",
								href: "/account",
								"aria-label": "Open account settings",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "workspace-avatar",
									children: bootstrap?.user?.displayName?.slice(0, 1).toUpperCase() || (isConnecting ? "…" : "E")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: bootstrap?.user?.displayName || (isConnecting ? "Workspace" : "Espacios") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: isConnecting ? "Connecting" : role })] })]
							})
						]
					}),
					customizingSidebar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sidebar-customizer",
						role: "dialog",
						"aria-modal": "true",
						"aria-labelledby": "sidebar-customizer-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Workspace navigation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "sidebar-customizer-title",
								children: "Customize left panel"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCustomizingSidebar(false),
								"aria-label": "Close sidebar customization",
								children: "×"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "sidebar-customizer-intro",
								children: "Choose which tools stay one click away. Hidden tools remain available under More."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sidebar-customizer-list",
								children: orderedSidebarItems.map((item) => {
									const selected = visibleSidebarSet.has(item.id);
									const visibleIds = orderedSidebarItems.filter((candidate) => visibleSidebarSet.has(candidate.id)).map((candidate) => candidate.id);
									const visibleIndex = visibleIds.indexOf(item.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: selected ? "is-selected" : "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: selected,
												disabled: item.locked,
												onChange: () => toggleSidebarItem(item)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: item.icon }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.locked ? "Always available" : selected ? "Shown in the left panel" : "Available under More" })] })
										] }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sidebar-order-actions",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: visibleIndex <= 0,
												onClick: () => moveSidebarItem(item.id, -1),
												"aria-label": `Move ${item.label} up`,
												children: "↑"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: visibleIndex === visibleIds.length - 1,
												onClick: () => moveSidebarItem(item.id, 1),
												"aria-label": `Move ${item.label} down`,
												children: "↓"
											})]
										}) : null]
									}, item.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSidebarOrder(defaultSidebarOrder);
									setSidebarVisible(defaultSidebarVisible);
								},
								children: "Reset"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "workspace-primary-button",
								type: "button",
								onClick: () => setCustomizingSidebar(false),
								children: "Done"
							})] })
						]
					}) : null
				]
			}),
			drawer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "workspace-scrim",
				type: "button",
				onClick: () => setDrawer(false),
				"aria-label": "Close navigation"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "workspace-main",
				id: "workspace-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "workspace-topbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "workspace-menu",
								type: "button",
								onClick: () => setDrawer(true),
								"aria-label": "Open navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "menu" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "workspace-crumbs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workspace" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "/" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: copy.title })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "workspace-search",
								action: "/aether",
								method: "get",
								role: "search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: "workspace-search-query",
										children: "Search or ask Aether"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "workspace-search-query",
										name: "prompt",
										placeholder: "Search or ask Aether…",
										autoComplete: "off"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeControl, { placement: "workspace" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "workspace-top-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "workspace-status",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), bootstrap?.summary.providerStatus || "Connecting"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									className: "workspace-help",
									href: "/request-proposal",
									"aria-label": "Request support",
									children: "?"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-content",
						children: [
							surface !== "aether" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "workspace-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "workspace-heading-copy",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy.eyebrow }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: copy.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.intro })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "workspace-heading-actions",
									children: [classicSurfaceHref(surface) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: classicSurfaceHref(surface),
										className: "workspace-secondary-button",
										children: "Classic view"
									}) : null, canEdit && surface !== "account" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceAction, {
										surface,
										onNotice: setNotice,
										onReload: load
									}) : null]
								})]
							}) : null,
							notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "workspace-notice",
								role: "status",
								children: notice
							}) : null,
							state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingPanels, {}) : null,
							state === "denied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInState, { authenticated: Boolean(bootstrap?.authenticated) }) : null,
							state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: load }) : null,
							state === "empty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								surface,
								canEdit
							}) : null,
							state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceContent, {
								surface,
								payloads,
								bootstrap,
								canEdit,
								onNotice: setNotice,
								onReload: load
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileQuickActions, {
						surface,
						isOnboarded
					})
				]
			})
		]
	});
}
function SurfaceAction({ surface, onNotice, onReload }) {
	if (surface === "intelligence") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "workspace-primary-button",
		type: "button",
		onClick: () => {
			document.querySelector(".market-query input")?.focus();
			onNotice("Search one product phrase or customer problem. Live queries only run when you submit them.");
		},
		children: "New search"
	});
	if (surface !== "plans" && surface !== "research") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		className: "workspace-primary-button",
		href: createSurfaceHref(surface),
		children: "+ New"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "workspace-primary-button",
		type: "button",
		onClick: () => {
			document.getElementById(`${surface}-composer`)?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			onNotice(surface === "plans" ? "Add a plan below, then save it to your workspace." : "Describe the question below to start a report.");
		},
		children: "+ New"
	});
}
function SurfaceContent({ surface, payloads, bootstrap, canEdit, onNotice, onReload }) {
	if (surface === "aether") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherSurface, {
		payloads,
		bootstrap,
		onNotice
	});
	if (surface === "leads") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadsSurface, { data: payloads[0] });
	if (surface === "plans") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlansSurface, {
		data: payloads[0],
		canEdit,
		onNotice,
		onReload
	});
	if (surface === "research") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchSurface, {
		data: payloads[0],
		canEdit,
		onNotice,
		onReload
	});
	if (surface === "learn") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnSurface, { data: payloads[0] });
	if (surface === "socials") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialsSurface, { data: payloads[0] });
	if (surface === "ops") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsSurface, {
		data: payloads,
		canEdit,
		onNotice,
		onReload
	});
	if (surface === "mail") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailSurface, { data: payloads });
	if (surface === "intelligence") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketIntelligenceSurface, {
		data: payloads[0],
		canEdit,
		onNotice
	});
	if (surface === "account") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSurface, { bootstrap });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrmSurface, { data: payloads[0], canEdit });
}
function AccountSurface({ bootstrap }) {
	const displayName = bootstrap?.user?.displayName || "Espacios member";
	const email = bootstrap?.user?.email || "Signed-in account";
	const role = bootstrap?.role || "viewer";
	const plan = bootstrap?.plan ? `${bootstrap.plan.tier} · ${bootstrap.plan.billingCycle}` : "No plan selected";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "account-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "workspace-panel account-profile-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "account-profile-avatar",
					"aria-hidden": "true",
					children: displayName.slice(0, 1).toUpperCase()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "account-profile-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Signed in as" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: displayName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: email })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "account-role-badge",
					children: role
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "account-settings-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Workspace",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, { items: [
						[bootstrap?.workspace?.name || "My workspace", "Current workspace"],
						[`${bootstrap?.summary.activeProjects || 0} active projects`, "Workspace activity"],
						[bootstrap?.summary.providerStatus || "Operational", "Provider status"]
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Plan and access",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, { items: [
						[plan, "Current selection"],
						[role, "Workspace role"],
						[`${bootstrap?.capabilities.length || 0} capabilities`, "Available to this account"]
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "account-inline-action",
						href: "/pricing",
						children: "Review pricing"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Session continuity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "account-session-copy",
						children: "Your signed-in session is shared across the Espacios workspace. Access tokens refresh securely in the background so navigation between tools does not sign you out."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "account-session-status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), " Active on this device"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Connected work",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "account-link-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/plans",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "plans" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Planning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Plans and execution" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/research",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Research" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Reports and sources" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/mail",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "mail" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Mail" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Campaign activity" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/crm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "crm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CRM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Contacts and deals" })] })]
							})
						]
					})
				})
			]
		})]
	});
}
var aetherAttachmentLimit = 14 * 1024 * 1024;
function aetherAttachmentFromFile(file) {
	if (file.size > aetherAttachmentLimit) return null;
	if (file.type.startsWith("image/")) return {
		file,
		kind: "image",
		previewUrl: URL.createObjectURL(file)
	};
	if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return {
		file,
		kind: "pdf"
	};
	if (file.type.startsWith("text/") || /\.(md|csv|json|xml|html?|log)$/i.test(file.name)) return {
		file,
		kind: "text"
	};
	return null;
}
function fileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
		reader.onerror = () => reject(reader.error || /* @__PURE__ */ new Error("file_read_failed"));
		reader.readAsDataURL(file);
	});
}
function safeAetherHref(href) {
	const trimmed = href.trim();
	if (trimmed.startsWith("/chat?say=")) return trimmed.replace(/^\/chat\?say=/, "/aether?prompt=");
	if (trimmed.startsWith("/") || /^(https?:|mailto:)/i.test(trimmed)) return trimmed;
	return "#";
}
function AetherInlineLink({ href, children, keyValue }) {
	const safeHref = safeAetherHref(href);
	if (safeHref.startsWith("/")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		className: "aether-rich-link",
		href: safeHref,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: "↗"
		})]
	}, keyValue);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		className: "aether-rich-link",
		href: safeHref,
		target: safeHref.startsWith("http") ? "_blank" : void 0,
		rel: safeHref.startsWith("http") ? "noreferrer" : void 0,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: "↗"
		})]
	}, keyValue);
}
function aetherInline(text, keyPrefix) {
	return text.split(/(\*\*\[[^\]]+\]\([^)]+\)\*\*|\[[^\]]+\]\([^)]+\)|\*\*[^*\n]+\*\*|`[^`\n]+`|https?:\/\/[^\s<]+)/g).filter(Boolean).map((token, index) => {
		const key = `${keyPrefix}-${index}`;
		const boldLink = token.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
		if (boldLink) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherInlineLink, {
			href: boldLink[2],
			keyValue: `${key}-link`,
			children: boldLink[1]
		}) }, key);
		const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
		if (link) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherInlineLink, {
			href: link[2],
			keyValue: key,
			children: link[1]
		}, key);
		const bold = token.match(/^\*\*([^*]+)\*\*$/);
		if (bold) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: bold[1] }, key);
		const code = token.match(/^`([^`]+)`$/);
		if (code) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code[1] }, key);
		if (/^https?:\/\//i.test(token)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherInlineLink, {
			href: token,
			keyValue: key,
			children: token.replace(/^https?:\/\//i, "")
		}, key);
		return token;
	});
}
function AetherRichText({ content }) {
	const lines = String(content || "").replace(/\r/g, "").split("\n");
	const blocks = [];
	let index = 0;
	while (index < lines.length) {
		const line = lines[index].trimEnd();
		if (!line.trim()) {
			index += 1;
			continue;
		}
		if (line.startsWith("```")) {
			const language = line.slice(3).trim();
			const code = [];
			index += 1;
			while (index < lines.length && !lines[index].trim().startsWith("```")) {
				code.push(lines[index]);
				index += 1;
			}
			index += 1;
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				"data-language": language || void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code.join("\n") })
			}, `code-${index}`));
			continue;
		}
		const heading = line.match(/^(#{1,4})\s+(.+)$/);
		if (heading) {
			const Heading = heading[1].length <= 2 ? "h3" : "h4";
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, { children: aetherInline(heading[2], `heading-${index}`) }, `heading-${index}`));
			index += 1;
			continue;
		}
		if (/^[-*+]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
			const ordered = /^\d+[.)]\s+/.test(line);
			const items = [];
			while (index < lines.length && (ordered ? /^\d+[.)]\s+/.test(lines[index].trim()) : /^[-*+]\s+/.test(lines[index].trim()))) {
				items.push(lines[index].trim().replace(ordered ? /^\d+[.)]\s+/ : /^[-*+]\s+/, ""));
				index += 1;
			}
			const List = ordered ? "ol" : "ul";
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: items.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: aetherInline(item, `list-${index}-${itemIndex}`) }, `${index}-${itemIndex}`)) }, `list-${index}`));
			continue;
		}
		if (line.trim().startsWith(">")) {
			const quote = [];
			while (index < lines.length && lines[index].trim().startsWith(">")) {
				quote.push(lines[index].trim().replace(/^>\s?/, ""));
				index += 1;
			}
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: aetherInline(quote.join(" "), `quote-${index}`) }, `quote-${index}`));
			continue;
		}
		const paragraph = [line.trim()];
		index += 1;
		while (index < lines.length && lines[index].trim() && !/^(#{1,4}\s+|```|[-*+]\s+|\d+[.)]\s+|>)/.test(lines[index].trim())) {
			paragraph.push(lines[index].trim());
			index += 1;
		}
		blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: aetherInline(paragraph.join(" "), `paragraph-${index}`) }, `paragraph-${index}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aether-rich-text",
		children: blocks
	});
}
function AetherArtifacts({ item }) {
	const cards = Array.isArray(item.artifact_cards) ? item.artifact_cards.map(asRecord) : Object.keys(asRecord(item.card)).length ? [asRecord(item.card)] : [];
	if (!cards.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aether-artifact-cards",
		children: cards.map((card, index) => {
			const href = value(card, [
				"href",
				"url",
				"action_url"
			], "/aether");
			const title = value(card, [
				"title",
				"label",
				"name"
			], "Open workspace artifact");
			const description = value(card, [
				"description",
				"subtitle",
				"status"
			]);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: safeAetherHref(href),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { "aria-hidden": "true" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: description }) : null] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						"aria-hidden": "true",
						children: "↗"
					})
				]
			}, `${title}-${index}`);
		})
	});
}
function workspaceEvidenceMessage(data) {
 const payload = asRecord(data), report = asRecord(payload.report);
 const notices = [];
 if (payload.model_available === false || report.model_available === false) notices.push("The language model is temporarily unavailable. This response uses available sources or a conservative fallback.");
 if (payload.web_available === false || report.web_available === false) notices.push("Live web search is unavailable. Current information could not be verified.");
 else if (payload.grounded === false || report.grounded === false) notices.push("This output has no verified web grounding. Check consequential claims against reliable sources.");
 if (!notices.length && Array.isArray(payload.degraded) && payload.degraded.length) notices.push("Some AI services are temporarily unavailable. Review this fallback before acting.");
 return notices.join(" ");
}
function WorkspaceEvidenceNotice({ data }) {
 const message = workspaceEvidenceMessage(data);
 return message ? (0, import_jsx_runtime.jsx)("p", { className: "surface-data-note", role: "status", children: message }) : null;
}
function RecoverableArtifact({ kind, draft, content, onRetry, working, onNotice }) {
 const [copying, setCopying] = (0, import_react.useState)(false);
 const title = value(draft, ["title", "topic"], `Unsaved ${kind.toLowerCase()} draft`);
 const sources = Array.isArray(draft.sources) ? draft.sources.map(asRecord) : [];
 const warning = workspaceEvidenceMessage(draft);
 const references = sources.map((source) => { const href = value(source, ["url", "href", "link"]); return /^https?:\/\//i.test(href) ? `${value(source, ["title", "name"], href)}: ${href}` : ""; }).filter(Boolean);
 const text = `# ${title}\n\n${warning ? warning + "\n\n" : ""}${content}${references.length ? "\n\n## Sources\n" + references.join("\n") : ""}`;
 const copy = async () => {
  setCopying(true);
  try { await navigator.clipboard.writeText(text); onNotice("Draft copied. It has not been saved to your workspace."); }
  catch { onNotice("The clipboard is unavailable. Download the draft to keep a copy."); }
  finally { setCopying(false); }
 };
 const download = () => {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = (title.replace(/[^a-z0-9-]+/gi,"-").replace(/^-|-$/g,"") || "draft") + ".md";
  document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
 };
 return (0, import_jsx_runtime.jsxs)("section", { className: "workspace-panel", role: "region", "aria-label": `Unsaved ${kind.toLowerCase()} draft`, children: [
  (0, import_jsx_runtime.jsx)("h3", { children: `Unsaved ${kind.toLowerCase()} draft` }),
  (0, import_jsx_runtime.jsx)("p", { children: "Generation completed, but this draft has not been saved. Keep a copy or retry saving it." }),
  (0, import_jsx_runtime.jsx)(WorkspaceEvidenceNotice, { data: draft }),
  (0, import_jsx_runtime.jsxs)("div", { className: "artifact-viewer-actions", children: [
   (0, import_jsx_runtime.jsx)("button", { type: "button", className: "workspace-secondary-button", disabled: working, onClick: onRetry, children: working ? "Saving draft…" : "Retry saving" }),
   (0, import_jsx_runtime.jsx)("button", { type: "button", className: "workspace-secondary-button", disabled: copying, onClick: () => void copy(), children: copying ? "Copying…" : "Copy draft" }),
   (0, import_jsx_runtime.jsx)("button", { type: "button", className: "workspace-secondary-button", onClick: download, children: "Download draft (.md)" })
  ] }),
  (0, import_jsx_runtime.jsx)(ArtifactText, { content }),
  sources.length ? (0, import_jsx_runtime.jsx)("p", { className: "surface-data-note", children: `${sources.length} source references are retained with this draft.` }) : null
 ] });
}
function AetherSurface({ payloads, bootstrap, onNotice }) {
	const [conversation, setConversation] = (0, import_react.useState)(arraysFrom(payloads[0]).slice(-40));
	const [message, setMessage] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "";
		const params = new URLSearchParams(window.location.search);
		const prompt = params.get("prompt")?.trim();
		const course = params.get("course")?.trim();
		if (prompt) return prompt;
		if (params.get("mode") === "teacher") return course ? `Teach me the next practical lesson in ${course.replace(/[-_]+/g, " ")}.` : "Help me choose and begin the right course for my current goal.";
		return "";
	});
	const [sending, setSending] = (0, import_react.useState)(false);
	const [attachment, setAttachment] = (0, import_react.useState)(null);
	const [dragActive, setDragActive] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const conversationRef = (0, import_react.useRef)(null);
	const messageRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (attachment?.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
	}, [attachment]);
	(0, import_react.useEffect)(() => {
		const conversationNode = conversationRef.current;
		if (conversationNode) conversationNode.scrollTop = conversationNode.scrollHeight;
	}, [conversation, sending]);
	const submitOnEnter = (event) => {
		if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
		event.preventDefault();
		event.currentTarget.form?.requestSubmit();
	};
	const chooseAttachment = (file) => {
		if (!file) return;
		const next = aetherAttachmentFromFile(file);
		if (!next) {
			onNotice(file.size > aetherAttachmentLimit ? "Attachments can be up to 14 MB." : "Use an image, PDF, or text-based file.");
			return;
		}
		setAttachment(next);
		onNotice("");
	};
	const removeAttachment = () => {
		setAttachment(null);
		if (fileRef.current) fileRef.current.value = "";
	};
	const insertLink = () => {
		const field = messageRef.current;
		const start = field?.selectionStart ?? message.length;
		const end = field?.selectionEnd ?? start;
		setMessage(`${message.slice(0, start)}https://${message.slice(end)}`);
		window.requestAnimationFrame(() => {
			messageRef.current?.focus();
			messageRef.current?.setSelectionRange(start + 8, start + 8);
		});
	};
	const toggleDictation = () => {
		if (listening) {
			recognitionRef.current?.stop();
			return;
		}
		const speechWindow = window;
		const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
		if (!Recognition) {
			onNotice("Live voice dictation is not supported in this browser. You can still attach photos, PDFs and text files.");
			return;
		}
		const recognition = new Recognition();
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.lang = navigator.language || "en-US";
		recognition.onresult = (event) => {
			let transcript = "";
			for (let resultIndex = event.resultIndex; resultIndex < event.results.length; resultIndex += 1) if (event.results[resultIndex].isFinal) transcript += event.results[resultIndex][0].transcript;
			if (transcript.trim()) setMessage((current) => `${current}${current.trim() ? " " : ""}${transcript.trim()}`);
		};
		recognition.onerror = () => {
			setListening(false);
			onNotice("Voice dictation could not start. Check the browser microphone permission and try again.");
		};
		recognition.onend = () => setListening(false);
		recognitionRef.current = recognition;
		setListening(true);
		try { recognition.start(); }
		catch { recognitionRef.current = null; setListening(false); onNotice("Voice dictation could not start. Check your microphone permission or type your message."); }
	};
	const submit = async (event) => {
		event.preventDefault();
		const prompt = message.trim();
		if (!prompt && !attachment || sending) return;
		const activeAttachment = attachment;
		const outgoingPrompt = prompt || `Review the attached ${activeAttachment?.kind || "file"}.`;
		const body = {
			message: outgoingPrompt,
			surface: "/aether",
			origin: "ecosystem_glass_v3"
		};
		try {
			if (activeAttachment) {
				body.fileName = activeAttachment.file.name;
				if (activeAttachment.kind === "text") body.fileText = (await activeAttachment.file.text()).slice(0, 5e4);
				else body.image = await fileAsDataUrl(activeAttachment.file);
			}
		} catch {
			onNotice("Aether could not read that attachment. Choose it again or use a different file.");
			return;
		}
		setConversation((items) => [...items, {
			role: "user",
			content: outgoingPrompt,
			attachment_name: activeAttachment?.file.name
		}]);
		setMessage("");
		setSending(true);
		try {
			const response = asRecord(await workspaceApiFetch("/api/chat", {
				method: "POST",
				body: JSON.stringify(body)
			}));
			const reply = workspaceAssistantReply(response);
			if (!reply) throw new WorkspaceApiError("The AI returned an empty response. Please try again.", 502);
			setConversation((items) => [...items, {
				role: "assistant",
				content: reply,
				artifact_cards: response.artifact_cards,
				card: response.card,
				status: response.status,
				evidence_notice: workspaceEvidenceMessage(response)
			}]);
			setAttachment((current) => current === activeAttachment ? null : current);
			if (fileRef.current?.files?.[0] === activeAttachment?.file) fileRef.current.value = "";
		} catch (error) {
			const explanation = error instanceof WorkspaceApiError ? error.message : "The AI service did not complete that request. Please try again.";
			setConversation((items) => [...items, {
				role: "assistant",
				content: explanation,
				status: "error",
				retry_prompt: outgoingPrompt,
				retry_attachment: activeAttachment?.file
			}]);
			setMessage((current) => current || prompt);
			onNotice("The request did not complete. Use Try again in the conversation; your message and attachment have been preserved.");
		} finally {
			setSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-grid surface-aether",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "workspace-panel aether-chat-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aether-welcome",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Good morning, ", bootstrap?.user?.displayName?.split(" ")[0] || "there"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "What shall we work on?" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "aether-context-status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), "Workspace context connected"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aether-conversation",
					ref: conversationRef,
					"aria-live": "polite",
					children: [conversation.length ? conversation.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `aether-message ${value(item, ["role"]) === "user" ? "is-user" : "is-ai"}`,
						children: [
							value(item, ["role"]) === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: value(item, [
								"content",
								"message",
								"text"
							], "Workspace update") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherRichText, { content: value(item, [
								"content",
								"message",
								"text"
							], "Workspace update") }),
							value(item, ["attachment_name"]) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "aether-message-attachment",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { "aria-hidden": "true" }), value(item, ["attachment_name"])]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherArtifacts, { item }),
							value(item, ["evidence_notice"]) ? (0, import_jsx_runtime.jsx)("p", { className: "surface-data-note", role: "status", children: value(item, ["evidence_notice"]) }) : null,
							value(item, ["status"]) === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMessage(value(item, ["retry_prompt"]));
									if (item.retry_attachment) chooseAttachment(item.retry_attachment);
									window.setTimeout(() => messageRef.current?.focus(), 0);
								},
								children: "Try again"
							}) : null
						]
					}, `${index}-${value(item, ["created_at"])}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherStarter, {}), sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aether-message is-ai aether-is-working",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aether is working" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: `aether-compose ${dragActive ? "is-dragging" : ""}`,
					id: "aether-compose",
					onSubmit: submit,
					onDragOver: (event) => {
						event.preventDefault();
						setDragActive(true);
					},
					onDragLeave: () => setDragActive(false),
					onDrop: (event) => {
						event.preventDefault();
						setDragActive(false);
						chooseAttachment(event.dataTransfer.files[0]);
					},
					children: [
						attachment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aether-attachment-chip",
							children: [
								attachment.kind === "image" && attachment.previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, {
									src: attachment.previewUrl,
									alt: "",
									width: 34,
									height: 34,
									unoptimized: true
								}) : attachment.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { "aria-hidden": "true" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: attachment.file.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									attachment.kind === "image" ? "Photo" : attachment.kind === "pdf" ? "PDF" : "Text file",
									" · ",
									Math.max(1, Math.round(attachment.file.size / 1024)),
									" KB"
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: removeAttachment,
									"aria-label": `Remove ${attachment.file.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aether-compose-main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "aether-compose-tools",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											ref: fileRef,
											className: "sr-only",
											type: "file",
											accept: "image/*,application/pdf,text/*,.md,.csv,.json,.xml,.html,.htm,.log",
											onChange: (event) => chooseAttachment(event.target.files?.[0])
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "aether-tool-button",
											type: "button",
											onClick: () => fileRef.current?.click(),
											"aria-label": "Attach a photo, PDF or text file",
											title: "Attach file",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { "aria-hidden": "true" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "aether-tool-button",
											type: "button",
											onClick: insertLink,
											"aria-label": "Add a link",
											title: "Add link",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { "aria-hidden": "true" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `aether-tool-button ${listening ? "is-active" : ""}`,
											type: "button",
											onClick: toggleDictation,
											"aria-label": listening ? "Stop voice dictation" : "Start voice dictation",
											"aria-pressed": listening,
											title: "Voice dictation",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { "aria-hidden": "true" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "aether-message",
									children: "Ask Aether anything"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									ref: messageRef,
									id: "aether-message",
									name: "aether-message",
									autoComplete: "off",
									spellCheck: true,
									value: message,
									onChange: (event) => setMessage(event.target.value),
									onKeyDown: submitOnEnter,
									onPaste: (event) => {
										const pastedFile = event.clipboardData.files[0];
										if (pastedFile) chooseAttachment(pastedFile);
									},
									placeholder: "Ask Aether anything… Press Enter to send, Shift+Enter for a new line.",
									rows: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "aether-send-button",
									type: "submit",
									disabled: sending || !message.trim() && !attachment,
									"aria-label": "Send message",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendHorizontal, { "aria-hidden": "true" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "aether-compose-hint",
							children: "Enter to send · Shift+Enter for a new line · Add photos, PDFs, text or links"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "surface-side-stack",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Memory",
					action: "View all",
					className: "aether-memory-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, { items: [
						[`${bootstrap?.summary.savedMemories || 0} saved memories`, "Workspace context"],
						[bootstrap?.plan ? `${bootstrap.plan.tier} plan` : "No plan selected", "Account"],
						[bootstrap?.summary.providerStatus || "Operational", "Providers"]
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Quick actions",
					className: "aether-quick-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "quick-action-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActionLink, {
								href: "/plans#plans-composer",
								icon: "plans",
								title: "Create a plan",
								copy: "Turn an outcome into steps"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActionLink, {
								href: "/research#research-composer",
								icon: "research",
								title: "Research a topic",
								copy: "Find and save evidence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActionLink, {
								href: "/socials",
								icon: "socials",
								title: "Create content",
								copy: "Plan the next publishable item"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActionLink, {
								href: "/crm",
								icon: "crm",
								title: "Review pipeline",
								copy: "Find the next sales action"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Work pulse",
					action: "Live workspace",
					className: "aether-pulse-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aether-work-pulse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/plans",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "plans" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [bootstrap?.summary.openActions || 0, " open actions"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Plans and next steps" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										"aria-hidden": "true",
										children: "→"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/research",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Research library" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Reports, sources and PDFs" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										"aria-hidden": "true",
										children: "→"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/calendar",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "calendar" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Upcoming work" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Calendar and follow-ups" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										"aria-hidden": "true",
										children: "→"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								href: "/ops",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "ops" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [bootstrap?.summary.activeProjects || 0, " active systems"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Operations and automation" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										"aria-hidden": "true",
										children: "→"
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "workspace-panel connected-tools",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "database" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Connected tools" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [secondaryNavigation.length, " available"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: secondaryNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connected-tool-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: item.href,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.description })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "connected-tool-aether",
							href: aetherPromptHref(item.aetherPrompt, item.label),
							children: "Ask Aether"
						})]
					}, item.href)) })]
				})
			]
		})]
	});
}
function QuickActionLink({ href, icon, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		href,
		"aria-label": `${title}. ${copy}`,
		title: copy,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title })]
	});
}
function AetherStarter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "aether-starter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I’d love to help you plan the next move. Here’s a quick outline to get started." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Define the outcome" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Identify the audience" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Build the timeline" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Create the first artifact" })
		] })]
	});
}
function planTaskProgress(tasks) {
	const units = tasks.flatMap((task) => [{ completed: task.completed }, ...task.subtasks]);
	return units.length ? Math.round(units.filter((unit) => unit.completed).length / units.length * 100) : 0;
}
function cleanPlanLine(line) {
	return line.replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+|#{1,4}\s+|[-*]\s*\[[ xX]\]\s*)/, "").replace(/\*\*/g, "").trim();
}
function planTasksFromContent(content, planTitle) {
	const lines = String(content || "").split(/\r?\n/);
	const phases = [];
	let current = null;
	for (const raw of lines) {
		const heading = raw.match(/^\s*#{2,4}\s+(.+)/);
		if (heading) {
			current = {
				title: cleanPlanLine(heading[1]),
				steps: []
			};
			phases.push(current);
			continue;
		}
		const step = raw.match(/^\s*(?:[-*+]\s+|\d+[.)]\s+|[-*]\s*\[[ xX]\]\s*)(.+)/);
		if (!step) continue;
		const title = cleanPlanLine(step[1]);
		if (!title) continue;
		if (!current) {
			current = {
				title: "Execution",
				steps: []
			};
			phases.push(current);
		}
		current.steps.push(title);
	}
	const useful = phases.filter((phase) => phase.title && !/contents|sources|appendix/i.test(phase.title));
	if (useful.length) return useful.slice(0, 12).map((phase, phaseIndex) => ({
		id: `phase-${phaseIndex + 1}`,
		title: phase.title,
		completed: false,
		subtasks: (phase.steps.length ? phase.steps : [
			`Define the owner and success measure for ${phase.title.toLowerCase()}`,
			`Complete the working output for ${phase.title.toLowerCase()}`,
			`Review dependencies and confirm the next handoff`
		]).slice(0, 12).map((title, stepIndex) => ({
			id: `phase-${phaseIndex + 1}-step-${stepIndex + 1}`,
			title,
			completed: false
		}))
	}));
	return [
		["Align the outcome", [
			`Define the measurable result for ${planTitle || "the plan outcome"}`,
			"Confirm constraints, stakeholders and decision rights",
			"Assign an owner and target date"
		]],
		["Build the working plan", [
			"Break the outcome into milestones",
			"Map dependencies and required inputs",
			"Sequence the first two weeks of work"
		]],
		["Execute and communicate", [
			"Start the highest-leverage workstream",
			"Record evidence, decisions and blockers",
			"Share a concise progress update with the team"
		]],
		["Review and close", [
			"Validate the result against the success measure",
			"Capture what should become a repeatable process",
			"Confirm the next decision or handoff"
		]]
	].map(([title, steps], phaseIndex) => ({
		id: `phase-${phaseIndex + 1}`,
		title,
		completed: false,
		subtasks: steps.map((step, stepIndex) => ({
			id: `phase-${phaseIndex + 1}-step-${stepIndex + 1}`,
			title: step,
			completed: false
		}))
	}));
}
function insertPlanFormatting(textarea, content, setContent, prefix, suffix = "") {
	if (!textarea) return;
	const start = textarea.selectionStart;
	const end = textarea.selectionEnd;
	const selected = content.slice(start, end) || (prefix.includes("#") ? "Section title" : "Plan detail");
	setContent(`${content.slice(0, start)}${prefix}${selected}${suffix}${content.slice(end)}`);
	window.setTimeout(() => {
		textarea.focus();
		textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
	}, 0);
}
function PlanWorkspace({ plan, onClose, onNotice }) {
	const planId = artifactId(plan);
	const planTitle = value(plan, ["title"], "Untitled plan");
	const planContent = value(plan, ["content"], "This plan does not have written content yet.");
	const [tasks, setTasks] = (0, import_react.useState)(() => planTasksFromContent(planContent, planTitle));
	const [comments, setComments] = (0, import_react.useState)([]);
	const [members, setMembers] = (0, import_react.useState)([{
		id: "aether",
		name: "Aether",
		email: "aether@espacios.me",
		type: "aether"
	}]);
	const [permissions, setPermissions] = (0, import_react.useState)({
		canEdit: false,
		canComment: false
	});
	const [state, setState] = (0, import_react.useState)("loading");
	const [comment, setComment] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [commenting, setCommenting] = (0, import_react.useState)(false);
	const closeRef = (0, import_react.useRef)(null);
	const progress = planTaskProgress(tasks);
	(0, import_react.useEffect)(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const closeOnEscape = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", closeOnEscape);
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [onClose]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const load = async () => {
			setState("loading");
			try {
				const response = asRecord(await workspaceApiFetch(`/api/plans/${encodeURIComponent(planId)}/collaboration`));
				if (cancelled) return;
				const savedTasks = Array.isArray(response.tasks) ? response.tasks : [];
				const derivedTasks = planTasksFromContent(planContent, planTitle);
				setTasks(savedTasks.length ? savedTasks : derivedTasks);
				setComments(Array.isArray(response.comments) ? response.comments.map(asRecord) : []);
				setMembers(Array.isArray(response.members) ? response.members.map((item) => {
					const member = asRecord(item);
					return {
						id: value(member, ["id"]),
						name: value(member, ["name"], "Team member"),
						email: value(member, ["email"]),
						type: value(member, ["type"])
					};
				}) : []);
				const permissionData = asRecord(response.permissions);
				const nextPermissions = {
					canEdit: permissionData.canEdit === true,
					canComment: permissionData.canComment === true
				};
				setPermissions(nextPermissions);
				setState("ready");
				if (!savedTasks.length && nextPermissions.canEdit && derivedTasks.length) await workspaceApiFetch(`/api/plans/${encodeURIComponent(planId)}/collaboration`, {
					method: "PUT",
					body: JSON.stringify({ tasks: derivedTasks })
				});
			} catch {
				if (!cancelled) setState("error");
			}
		};
		load();
		return () => {
			cancelled = true;
		};
	}, [
		planId,
		planContent,
		planTitle
	]);
	const persistTasks = async (next, previous) => {
		setTasks(next);
		setSaving(true);
		try {
			await workspaceApiFetch(`/api/plans/${encodeURIComponent(planId)}/collaboration`, {
				method: "PUT",
				body: JSON.stringify({ tasks: next })
			});
		} catch {
			setTasks(previous);
			onNotice("The task update could not be saved. Your previous plan state was restored.");
		} finally {
			setSaving(false);
		}
	};
	const toggleTask = (taskId, subtaskId) => {
		if (!permissions.canEdit || saving) return;
		const previous = tasks;
		persistTasks(tasks.map((task) => task.id !== taskId ? task : subtaskId ? {
			...task,
			subtasks: task.subtasks.map((subtask) => subtask.id === subtaskId ? {
				...subtask,
				completed: !subtask.completed
			} : subtask)
		} : {
			...task,
			completed: !task.completed
		}), previous);
	};
	const mention = (member) => {
		const token = member.type === "aether" ? "@Aether" : `@${member.name.replace(/\s+/g, " ")}`;
		setComment((current) => `${current}${current && !/\s$/.test(current) ? " " : ""}${token} `);
	};
	const submitComment = async (event) => {
		event.preventDefault();
		const body = comment.trim();
		if (!body || commenting || !permissions.canComment) return;
		const mentioned = members.filter((member) => body.toLowerCase().includes(`@${member.name.toLowerCase()}`) || member.type === "aether" && /@aether\b/i.test(body)).map((member) => member.type === "aether" ? "aether" : member.id);
		setCommenting(true);
		try {
			const response = asRecord(await workspaceApiFetch(`/api/plans/${encodeURIComponent(planId)}/collaboration`, {
				method: "POST",
				body: JSON.stringify({
					body,
					mentions: mentioned,
					tasks,
					planTitle,
					planContent
				})
			}));
			const additions = [response.comment, response.aetherComment].filter(Boolean).map(asRecord);
			setComments((items) => [...items, ...additions]);
			setComment("");
			if (typeof response.aetherError === "string" && response.aetherError) onNotice(response.aetherError);
			else onNotice(mentioned.includes("aether") ? "Comment saved. Aether reviewed the plan and responded." : "Comment saved to the plan context.");
		} catch {
			onNotice("The comment could not be saved. Your text is still here so you can retry.");
		} finally {
			setCommenting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "artifact-viewer-backdrop plan-workspace-backdrop",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "plan-workspace",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "plan-workspace-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "plan-workspace-header",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Interactive plan" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "plan-workspace-title",
								children: planTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value(plan, ["updated_at", "created_at"], "Connected workspace plan") })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "plan-progress-summary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "plan-progress-ring",
								style: { background: `conic-gradient(var(--u-accent) ${progress * 3.6}deg, rgba(90,100,110,.12) 0deg)` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progress, "%"] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: saving ? "Saving progress…" : "Progress saved" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: closeRef,
							type: "button",
							onClick: onClose,
							"aria-label": "Close plan",
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plan-workspace-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void downloadArtifactPdf(planTitle, planContent, "Plan"),
							children: "Download PDF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: `/legacy/plans?id=${encodeURIComponent(planId)}`,
							children: "Open full plan tools →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							tasks.length,
							" phases · ",
							tasks.reduce((sum, task) => sum + task.subtasks.length, 0),
							" granular substeps"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plan-workspace-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "plan-rich-document",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "plan-section-label",
							children: "Plan brief"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactText, { content: planContent })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "plan-execution-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "plan-task-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "plan-section-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Execution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Milestones and substeps" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progress, "% complete"] })]
								}),
								state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "plan-loading",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
									]
								}) : null,
								state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "empty-inline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Collaboration could not load. Close and reopen the plan to retry." })
								}) : null,
								state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "plan-task-list",
									children: tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: task.completed ? "is-complete" : "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: task.completed,
											disabled: !permissions.canEdit || saving,
											onChange: () => toggleTask(task.id)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: task.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											task.subtasks.filter((subtask) => subtask.completed).length,
											" of ",
											task.subtasks.length,
											" substeps"
										] })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: task.subtasks.map((subtask) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: subtask.completed ? "is-complete" : "",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: subtask.completed,
												disabled: !permissions.canEdit || saving,
												onChange: () => toggleTask(task.id, subtask.id)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subtask.title })]
										}, subtask.id)) })]
									}, task.id))
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "plan-comments-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "plan-section-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Plan conversation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Comments and decisions" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: comments.length })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "plan-comments",
									"aria-live": "polite",
									children: comments.length ? comments.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: value(item, ["authorType", "author_type"]) === "aether" ? "is-aether" : "",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value(item, ["authorName", "author_name"], "Workspace member") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value(item, ["createdAt", "created_at"], "Now") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: value(item, ["body"]) })]
									}, value(item, ["id"], String(index)))) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "empty-inline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Comment on a decision or mention Aether for an automatic plan review." })
									})
								}),
								permissions.canComment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "plan-comment-form",
									onSubmit: submitComment,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mention-rail",
											"aria-label": "Mention a collaborator",
											children: members.slice(0, 8).map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => mention(member),
												children: member.type === "aether" ? "@Aether" : `@${member.name}`
											}, `${member.id}-${member.email}`))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "sr-only",
											htmlFor: "plan-comment",
											children: "Add a plan comment"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "plan-comment",
											value: comment,
											onChange: (event) => setComment(event.target.value),
											placeholder: "Add a comment or mention @Aether for a review…",
											rows: 3
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "workspace-primary-button",
											type: "submit",
											disabled: commenting || !comment.trim(),
											children: commenting ? /\@aether\b/i.test(comment) ? "Aether is reviewing…" : "Sending…" : "Send comment"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "plan-permission-note",
									children: "This plan is read-only for your workspace role."
								})
							]
						})]
					})]
				})
			]
		})
	});
}
function PlansSurface({ data, canEdit, onNotice, onReload }) {
	const plans = (0, import_react.useMemo)(() => arraysFrom(data), [data]);
	const [view, setView] = (0, import_react.useState)("Tasks");
	const [goal, setGoal] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)(null);
	const [recoverablePlan, setRecoverablePlan] = (0, import_react.useState)(null);
	const completedPlans = plans.filter((item) => /complete|done/i.test(value(item, ["status"]))).length;
	const activePlans = plans.filter((item) => /active|progress|working/i.test(value(item, ["status"]))).length;
	const portfolioProgress = plans.length ? Math.round(completedPlans / plans.length * 100) : 0;
	const manualEditorRef = (0, import_react.useRef)(null);
	const openPlan = (0, import_react.useCallback)((plan, mode = "push") => {
		setSelectedPlan(plan);
		const id = artifactId(plan);
		if (id) updateArtifactLocation(id, mode);
	}, []);
	const closePlan = (0, import_react.useCallback)(() => {
		setSelectedPlan(null);
		updateArtifactLocation("", "replace");
	}, []);
	(0, import_react.useEffect)(() => {
		const syncFromLocation = () => {
			const id = new URLSearchParams(window.location.search).get("id") || "";
			setSelectedPlan(id ? plans.find((plan) => artifactId(plan) === id) || null : null);
		};
		syncFromLocation();
		window.addEventListener("popstate", syncFromLocation);
		return () => window.removeEventListener("popstate", syncFromLocation);
	}, [plans]);
	const save = async (event) => {
		event.preventDefault();
		if (!title.trim() || saving) return;
		setSaving(true);
		try {
			const saved = asRecord(await workspaceApiFetch("/api/account/plans", {
				method: "POST",
				body: JSON.stringify({
					title,
					content,
					source: "workspace_v2"
				})
			}));
			if (!artifactId(asRecord(saved.plan)) || saved.saved === false) throw new WorkspaceApiError("The plan save was not confirmed. Your draft is still available.", 503);
			setTitle("");
			setContent("");
			setRecoverablePlan(null);
			onNotice("Plan saved to your workspace.");
			await onReload();
		} catch {
			onNotice("The plan could not be saved. Check your permission or try again.");
		} finally {
			setSaving(false);
		}
	};
	const generate = async (event) => {
		event.preventDefault();
		if (!goal.trim() || generating) return;
		setGenerating(true);
		try {
			const generatedPlan = asRecord(asRecord(await workspaceApiFetch("/api/account/plan-generate", {
				method: "POST",
				body: JSON.stringify({
					goal: goal.trim(),
					source: "workspace_v2"
				})
			})).plan);
			if (!artifactId(generatedPlan)) throw new WorkspaceApiError("The plan save was not confirmed. Your draft is still available.", 503, { draft: generatedPlan });
			setRecoverablePlan(null);
			setGoal("");
			onNotice("Aether created and saved a working plan. You can open it, download it, or continue refining it.");
			if (Object.keys(generatedPlan).length) openPlan(generatedPlan);
			await onReload();
		} catch (error) {
			const payload = error instanceof WorkspaceApiError ? error.payload : {};
			const draft = asRecord(payload?.draft || payload?.plan);
			if (value(draft, ["content", "markdown", "body"])) {
				setRecoverablePlan(draft); setTitle(value(draft, ["title"], goal)); setContent(value(draft, ["content", "markdown", "body"]));
				onNotice("Aether generated a plan draft, but it was not saved. Your draft is preserved below.");
			} else onNotice(error instanceof WorkspaceApiError ? error.message : "Aether could not generate the plan. Your goal is still here so you can retry.");
		} finally {
			setGenerating(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "planning-command-strip",
				"aria-label": "Planning command center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "planning-command-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Planning command center" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Move the portfolio from intention to execution." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Each plan stays connected to milestones, comments, team mentions and Aether reviews." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "planning-portfolio-progress",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "planning-progress-ring",
							style: { background: `conic-gradient(var(--u-accent) ${portfolioProgress * 3.6}deg, rgba(83,97,120,.12) 0deg)` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [portfolioProgress, "%"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [activePlans, " active"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							completedPlans,
							" completed · ",
							plans.length,
							" total"
						] })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "planning-command-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => document.getElementById("plans-composer")?.scrollIntoView({
								behavior: "smooth",
								block: "center"
							}),
							children: "Generate plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("Timeline"),
							children: "Review timeline"
						})]
					})
				]
			}),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "workspace-panel plan-generator",
				id: "plans-composer",
				onSubmit: generate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plan-generator-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "aether" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aether planning" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What outcome are you working toward?" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Aether uses your workspace context to create milestones, tasks and a usable plan file." })
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "plan-generator-input",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "plan-goal",
							children: "Plan outcome and context"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "plan-goal",
							value: goal,
							onChange: (event) => setGoal(event.target.value),
							placeholder: "For example: Launch our client onboarding system in six weeks with a clear owner and weekly milestones.",
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "workspace-primary-button",
							type: "submit",
							disabled: generating || !goal.trim(),
							children: generating ? "Building plan…" : "Create with Aether"
						})
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStrip, { metrics: [
				[String(plans.length), "All plans"],
				[String(activePlans), "In progress"],
				[String(completedPlans), "Completed"],
				[`${portfolioProgress}%`, "Portfolio progress"]
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
						title: "Plan portfolio",
						tabs: [
							"Tasks",
							"Timeline",
							"Artifacts"
						],
						activeTab: view,
						onTabChange: setView
					}),
					view === "Tasks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
						rows: plans,
						columns: [
							["title", "Plan"],
							["status", "Status"],
							["updated_at", "Updated"]
						],
						empty: "No plans saved yet.",
						limit: plans.length,
						onOpen: openPlan,
						openLabel: "Open plan"
					}) : null,
					view === "Timeline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardGrid, {
						rows: plans,
						fallback: [],
						empty: "Plan dates and milestones will appear here.",
						limit: plans.length,
						onOpen: openPlan,
						openLabel: "Open plan"
					}) : null,
					view === "Artifacts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardGrid, {
						rows: plans.filter((plan) => Boolean(value(plan, ["content"]))),
						fallback: [],
						empty: "Saved plan files will appear here.",
						limit: plans.length,
						onOpen: openPlan,
						openLabel: "Open plan file"
					}) : null
				]
			}),
			recoverablePlan ? (0, import_jsx_runtime.jsx)(RecoverableArtifact, { kind: "Plan", draft: { ...recoverablePlan, title, content }, content, working: saving, onNotice, onRetry: () => void save({ preventDefault() {} }) }) : null,
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "workspace-panel workspace-composer rich-plan-composer",
				id: "plans-manual-composer",
				onSubmit: save,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rich plan editor" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Structure an existing plan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Use headings, checklists and clear milestones. The saved plan becomes available to Aether and your team." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						onChange: (event) => setTitle(event.target.value),
						placeholder: "Plan title",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rich-text-editor",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rich-text-toolbar",
							"aria-label": "Plan formatting",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => insertPlanFormatting(manualEditorRef.current, content, setContent, "## "),
									children: "Heading"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => insertPlanFormatting(manualEditorRef.current, content, setContent, "**", "**"),
									children: "Bold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => insertPlanFormatting(manualEditorRef.current, content, setContent, "- "),
									children: "Bullets"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => insertPlanFormatting(manualEditorRef.current, content, setContent, "- [ ] "),
									children: "Checklist"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							ref: manualEditorRef,
							value: content,
							onChange: (event) => setContent(event.target.value),
							placeholder: "## Outcome\n\nDescribe the result.\n\n## First milestone\n\n- [ ] Assign the owner\n- [ ] Complete the first working output",
							rows: 8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "workspace-secondary-button",
						type: "submit",
						disabled: saving,
						children: saving ? "Saving…" : "Save plan"
					})
				]
			}) : null,
			selectedPlan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanWorkspace, {
				plan: selectedPlan,
				onClose: closePlan,
				onNotice
			}) : null
		]
	});
}
function ResearchSurface({ data, canEdit, onNotice, onReload }) {
	const reports = (0, import_react.useMemo)(() => arraysFrom(data), [data]);
	const [view, setView] = (0, import_react.useState)("All");
	const [query, setQuery] = (0, import_react.useState)("");
	const [working, setWorking] = (0, import_react.useState)(false);
	const [researchPhase, setResearchPhase] = (0, import_react.useState)("");
	const [recoverableReport, setRecoverableReport] = (0, import_react.useState)(null);
	const [selectedReport, setSelectedReport] = (0, import_react.useState)(null);
	const [reportDetail, setReportDetail] = (0, import_react.useState)(null);
	const [detailState, setDetailState] = (0, import_react.useState)("loading");
	const [publishState, setPublishState] = (0, import_react.useState)("idle");
	const [publishedReport, setPublishedReport] = (0, import_react.useState)(null);
	const openReport = (0, import_react.useCallback)(async (report, mode = "push") => {
		const id = artifactId(report);
		if (!id) return;
		setSelectedReport(report);
		setReportDetail(null);
		setDetailState("loading");
		updateArtifactLocation(id, mode);
		try {
			setReportDetail(asRecord(await workspaceApiFetch(`/api/research/get?id=${encodeURIComponent(id)}`)));
			setDetailState("ready");
		} catch {
			setDetailState("error");
		}
	}, []);
	const closeReport = (0, import_react.useCallback)(() => {
		setSelectedReport(null);
		setReportDetail(null);
		setPublishState("idle");
		setPublishedReport(null);
		updateArtifactLocation("", "replace");
	}, []);
	(0, import_react.useEffect)(() => {
		const syncFromLocation = () => {
			const id = new URLSearchParams(window.location.search).get("id") || "";
			if (!id) {
				setSelectedReport(null);
				setReportDetail(null);
				return;
			}
			const match = reports.find((report) => artifactId(report) === id);
			if (match) openReport(match, "replace");
		};
		syncFromLocation();
		window.addEventListener("popstate", syncFromLocation);
		return () => window.removeEventListener("popstate", syncFromLocation);
	}, [reports, openReport]);
	const submit = async (event) => {
		event.preventDefault();
		if (!query.trim() || working) return;
		setWorking(true);
		setResearchPhase("Framing the question and source map…");
		const phaseTimer = window.setTimeout(() => setResearchPhase("Evaluating evidence and writing the report…"), 4500);
		try {
			const reportId = value(asRecord(await workspaceApiFetch("/api/research/generate", {
				method: "POST",
				body: JSON.stringify({
					query,
					topic: query,
					source: "workspace_v2",
					save: true,
					depth: "comprehensive",
					format: "decision-grade",
					deliver_pdf: true
				})
			})), ["id", "report_id"]);
			if (!reportId) throw new WorkspaceApiError("The report save was not confirmed. Your query is still available.", 503);
			setRecoverableReport(null);
			setQuery("");
			await onReload();
			if (reportId) {
				setResearchPhase("Preparing and delivering your PDF…");
				try {
					const delivery = asRecord(await workspaceApiFetch("/api/workspace-v2/research-deliver", {
						method: "POST",
						body: JSON.stringify({ id: reportId })
					}));
					const shareUrl = value(delivery, ["shareUrl"]);
					onNotice(`Comprehensive research saved. The PDF was sent to ${value(delivery, ["to"], "your account email")}${shareUrl ? ` and published at ${shareUrl}` : ""}.`);
				} catch {
					onNotice("Comprehensive research saved. PDF delivery is temporarily unavailable; open the report to download it now.");
				}
			} else onNotice("Comprehensive research saved to your library. Open it to review or download the PDF.");
		} catch (error) {
			const payload = error instanceof WorkspaceApiError ? asRecord(error.payload) : {};
			const draft = asRecord(payload.draft), report = asRecord(draft.report || payload.report);
			if (value(report, ["markdown", "content", "body"])) {
				setRecoverableReport({ ...draft, topic: draft.topic || query, title: draft.title || report.title || query, report, sources: Array.isArray(draft.sources) ? draft.sources : Array.isArray(payload.sources) ? payload.sources : [], cover_url: draft.cover_url || payload.cover_url || null });
				onNotice("Aether generated a research draft, but it was not saved. Your report and sources are preserved below.");
			} else onNotice(error instanceof WorkspaceApiError ? error.message : "Research could not start. Your query is still available to retry.");
		} finally {
			window.clearTimeout(phaseTimer);
			setResearchPhase("");
			setWorking(false);
		}
	};
	const retryReportSave = async () => {
		if (!recoverableReport || working) return;
		setWorking(true);
		try {
			const saved = asRecord(await workspaceApiFetch("/api/research/save", { method: "POST", body: JSON.stringify(recoverableReport) }));
			if (!artifactId(saved) || saved.saved === false) throw new WorkspaceApiError("The report save was not confirmed. Your draft is still available.", 503);
			setRecoverableReport(null); onNotice("Research saved to your workspace."); await onReload();
		} catch (error) { onNotice(error instanceof WorkspaceApiError ? error.message : "The report could not be saved. Your draft is still available."); }
		finally { setWorking(false); }
	};
	const filteredReports = view === "All" ? reports : reports.filter((report) => {
		return value(report, [
			"type",
			"status",
			"source"
		]).toLowerCase().includes(view.toLowerCase().replace(/s$/, ""));
	});
	const detailedReport = asRecord(reportDetail?.report);
	const reportTitle = value(detailedReport, ["title"], value(selectedReport || {}, ["title", "topic"], "Research report"));
	const reportMarkdown = value(detailedReport, [
		"markdown",
		"content",
		"body"
	]);
	const reportSources = Array.isArray(reportDetail?.sources) ? reportDetail.sources.map(asRecord) : [];
	const publishReport = async () => {
		if (!selectedReport || publishState === "working") return;
		setPublishState("working");
		try {
			const result = asRecord(await workspaceApiFetch("/api/research/reports", {
				method: "POST",
				body: JSON.stringify({ id: artifactId(selectedReport) })
			}));
			const output = {
				shareUrl: value(result, ["shareUrl"]),
				pdfUrl: value(result, ["pdfUrl"]),
				filename: value(result, ["filename"])
			};
			if (!output.shareUrl || !output.pdfUrl) throw new Error("publish_failed");
			setPublishedReport(output);
			setPublishState("ready");
			onNotice(`Shareable report published as ${output.filename}.`);
		} catch {
			setPublishState("error");
			onNotice("The shareable report could not be published. Your saved research is unchanged; try again.");
		}
	};
	const copyShareLink = async () => {
		if (!publishedReport?.shareUrl) return;
		await navigator.clipboard.writeText(publishedReport.shareUrl).catch(() => void 0);
		onNotice("Shareable research link copied.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "research-studio-intro",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Research studio" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "From a hard question to a cited decision document." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Every report includes evidence, counterarguments, recommendations, an aesthetic PDF and a readable share URL." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "01" }), " Scope the decision"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "02" }), " Evaluate evidence"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "03" }), " Publish and share"] })
				] })]
			}),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "research-search research-studio-search",
					id: "research-composer",
					onSubmit: submit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Research a decision, market, audience, competitor or complex question…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: working,
							children: working ? "Researching…" : "Build report"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "research-scope-rail",
					"aria-label": "Included research coverage",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current web" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Source register" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Counterarguments" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Action playbook" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF + share link" })
					]
				}),
				working ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "research-progress",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: researchPhase || "Building a comprehensive research report…" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Current sources, fact checking, risks, counterarguments and an action playbook are included." })
					]
				}) : null
			] }) : null,
			recoverableReport ? (0, import_jsx_runtime.jsx)(RecoverableArtifact, { kind: "Research", draft: recoverableReport, content: value(recoverableReport.report, ["markdown", "content", "body"]), onRetry: () => void retryReportSave(), working, onNotice }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceTabs, {
				label: "Research sources",
				tabs: [
					"All",
					"Web",
					"Docs",
					"Notes"
				],
				active: view,
				onChange: setView,
				className: "research-filters"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
					title: "Top findings",
					action: `${filteredReports.length} recent`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardGrid, {
					rows: filteredReports,
					fallback: [],
					empty: `No ${view.toLowerCase()} findings yet.`,
					limit: filteredReports.length,
					onOpen: openReport,
					openLabel: "Open research report"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
					title: "Research library",
					action: `${reports.length} saved`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					rows: reports,
					columns: [
						["title", "Report"],
						["created_at", "Saved"],
						["topic", "Topic"]
					],
					empty: "Your saved research will appear here.",
					limit: reports.length,
					onOpen: openReport,
					openLabel: "Open research report"
				})]
			}),
			selectedReport ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactViewer, {
				kind: "Research",
				title: reportTitle,
				subtitle: [value(detailedReport, ["subtitle"]), value(selectedReport, ["created_at"])].filter(Boolean).join(" · "),
				content: reportMarkdown,
				sources: reportSources,
				evidence: reportDetail,
				state: detailState,
				onClose: closeReport,
				onRetry: () => void openReport(selectedReport, "replace"),
				onDownload: async () => downloadArtifactPdf(reportTitle, reportMarkdown, "Research report", reportSources),
				onPublish: publishReport,
				publishState,
				publishedReport,
				onCopyShare: copyShareLink,
				fullHref: `/legacy/research?id=${encodeURIComponent(artifactId(selectedReport))}`
			}) : null
		]
	});
}
function LearnSurface({ data }) {
	const courses = arraysFrom(data);
	const catalog = asRecord(data);
	const progressConnected = catalog.progressConnected === true;
	const liveCourseCount = numberValue(catalog, ["liveCourseCount"], 0);
	const [view, setView] = (0, import_react.useState)("Courses");
	const shown = courses.length ? courses : [
		{
			id: "ai-business-foundations",
			title: "AI for Business Foundations",
			progress: 0,
			lessons: "6 guided lessons"
		},
		{
			id: "growth-marketing-mastery",
			title: "Growth Marketing Mastery",
			progress: 0,
			lessons: "8 guided lessons"
		},
		{
			id: "email-marketing-excellence",
			title: "Email Marketing Excellence",
			progress: 0,
			lessons: "7 guided lessons"
		},
		{
			id: "content-strategy-blueprint",
			title: "Content Strategy Blueprint",
			progress: 0,
			lessons: "5 guided lessons"
		}
	];
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All topics");
	const syncCopy = progressConnected ? liveCourseCount > 0 ? "Courses and progress are synced with your account." : "Course catalog connected. Progress will appear after you start a course." : "Course catalog ready. Progress sync is temporarily unavailable.";
	const categories = ["All topics", ...Array.from(new Set(shown.map((course) => value(course, ["category"], "Workspace skills"))))];
	const hasFilters = Boolean(query.trim()) || category !== "All topics";
	const clearFilters = () => {
		setQuery("");
		setCategory("All topics");
	};
	const browseCourses = () => {
		clearFilters();
		setView("Courses");
	};
	const emptyTitle = hasFilters ? "No courses found" : !progressConnected && view !== "Courses" ? "Progress is temporarily unavailable" : view === "My learning" ? "No courses in progress" : view === "Certificates" ? "No completed courses yet" : "No courses available yet";
	const emptyDescription = hasFilters ? "Try another search or topic to find a course." : !progressConnected && view !== "Courses" ? "Your progress could not be synced. You can still browse courses while we reconnect." : view === "My learning" ? "Start a course and your progress will appear here." : view === "Certificates" ? "Complete a course to see your achievements here." : "Check back soon for guided lessons.";
	const visibleCourses = shown.filter((course) => {
		const progress = numberValue(course, ["progress", "percent"], 0);
		const matchesView = view === "My learning" ? progress > 0 && progress < 100 : view === "Certificates" ? progress >= 100 : true;
		const matchesCategory = category === "All topics" || value(course, ["category"], "Workspace skills") === category;
		const haystack = `${value(course, ["title", "name"])} ${value(course, ["description"])} ${value(course, ["category"])}`.toLowerCase();
		return matchesView && matchesCategory && haystack.includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceTabs, {
				label: "Learning views",
				tabs: [
					"Courses",
					"My learning",
					"Certificates"
				],
				active: view,
				onChange: setView
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "learning-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "Search courses",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search courses"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "Filter course topic",
					value: category,
					onChange: (event) => setCategory(event.target.value),
					children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "surface-data-note",
				children: [
					syncCopy,
					" ",
					shown.length,
					" courses are available."
				]
			}),
			visibleCourses.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "course-grid",
				children: [visibleCourses.map((course, index) => {
					const progress = numberValue(course, ["progress", "percent"], 0);
					const courseId = value(course, ["id"], `course-${index + 1}`);
					const title = value(course, ["title", "name"], "Practical AI course");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "workspace-panel course-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "course-meta",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value(course, ["category"], "Workspace skills") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: value(course, ["level"], "Guided") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: value(course, ["description", "lessons"], "Learn with guided, practical lessons.") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress-track",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${Math.min(100, progress)}%` } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "course-card-footer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: progress > 0 ? `${progress}% complete` : value(course, ["lessons"], "Ready to start") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									href: `/aether?mode=teacher&course=${encodeURIComponent(courseId)}`,
									children: [progress > 0 ? "Continue" : "Start course", " →"]
								})]
							})
						]
					}, `${courseId}-${index}`);
				}), view === "Courses" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "workspace-panel teacher-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "aether-orb",
							children: "AI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Ask the AI teacher" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Get personal guidance, examples and a next lesson based on your active workspace." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: "/aether?mode=teacher",
							children: "Start a lesson →"
						})
					]
				}) : null]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel surface-context-empty",
				role: "status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: emptyTitle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: emptyDescription }),
					hasFilters || view !== "Courses" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "workspace-primary-button",
						type: "button",
						onClick: hasFilters ? clearFilters : browseCourses,
						children: hasFilters ? "Clear filters" : "Browse courses"
					}) : null
				]
			})
		]
	});
}
function LeadsSurface({ data }) {
	const totals = data?.totals || {
		leads: 0,
		newThisWeek: 0,
		qualified: 0,
		conversionRate: 0
	};
	const funnel = data?.funnel || [];
	const max = Math.max(...funnel.map((item) => item.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStrip, { metrics: [
			[String(totals.leads), "Total leads"],
			[String(totals.newThisWeek), "New this week"],
			[String(totals.qualified), "Qualified"],
			[`${totals.conversionRate}%`, "Conversion rate"]
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-split",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Campaigns",
				action: "View all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "campaign-list",
					children: (data?.campaigns || []).length ? data.campaigns.map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: campaign.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: campaign.status })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "progress-track",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${campaign.progress}%` } })
					})] }, campaign.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyInline, { text: "Campaign progress will appear here." })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Pipeline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "funnel-list",
					children: funnel.map((stage, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { width: `${Math.max(34, stage.value / max * 100)}%` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stage.label }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: stage.value }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { opacity: 1 - index * .12 } })
						]
					}, stage.label))
				})
			})]
		})]
	});
}
function SocialPostViewer({ post, onClose }) {
	const closeRef = (0, import_react.useRef)(null);
	const title = value(post, ["title", "topic"], "Social content");
	const content = value(post, [
		"caption",
		"content",
		"body",
		"text"
	], "This item is connected to the Socials workspace. Open the editor to review the complete creative and publishing settings.");
	const id = artifactId(post);
	(0, import_react.useEffect)(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const closeOnEscape = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", closeOnEscape);
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "artifact-viewer-backdrop",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "social-post-viewer",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "social-post-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Publishing item" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "social-post-title",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: [value(post, ["status"], "Draft"), value(post, [
					"scheduled_at",
					"created_at",
					"updated_at"
				])].filter(Boolean).join(" · ") })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: closeRef,
				type: "button",
				onClick: onClose,
				"aria-label": "Close social post",
				children: "×"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "social-post-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "social-status-chip",
					children: value(post, ["status"], "Draft")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Channel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value(post, [
						"platform",
						"channel",
						"network"
					], "Connected channel") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value(post, ["owner", "author"], "Workspace team") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Schedule" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value(post, ["scheduled_at", "publish_at"], "Not scheduled") })] })
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: content }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "social-post-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "workspace-primary-button",
						href: `/legacy/socials${id ? `?id=${encodeURIComponent(id)}` : ""}`,
						children: "Open publishing editor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "workspace-secondary-button",
						href: aetherPromptHref(`Review this social post and recommend the strongest improvement before publishing. Title: ${title}. Content: ${content}`, "Socials"),
						children: "Review with Aether"
					})]
				})] })]
			})]
		})
	});
}
function SocialsSurface({ data }) {
	const posts = arraysFrom(data);
	const today = /* @__PURE__ */ new Date();
	const [view, setView] = (0, import_react.useState)("Calendar");
	const [selectedPost, setSelectedPost] = (0, import_react.useState)(null);
	const openPost = (post) => {
		setSelectedPost(post);
		const id = artifactId(post);
		if (id) updateArtifactLocation(id);
	};
	const closePost = () => {
		setSelectedPost(null);
		updateArtifactLocation("", "replace");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceTabs, {
				label: "Social views",
				tabs: [
					"Calendar",
					"Content",
					"Analytics"
				],
				active: view,
				onChange: setView
			}),
			view === "Calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel social-calendar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
					title: today.toLocaleDateString("en", {
						month: "long",
						year: "numeric"
					}),
					action: "Month view"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "calendar-grid",
					children: Array.from({ length: 14 }, (_, index) => {
						const post = posts[index % Math.max(posts.length, 1)];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: index + 1 }), post && index % 3 === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openPost(post),
							"aria-label": `Open social post: ${value(post, [
								"title",
								"caption",
								"topic"
							], "Content draft")}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), value(post, [
								"title",
								"caption",
								"topic"
							], "Content draft")]
						}) : null] }, index);
					})
				})]
			}) : null,
			view === "Content" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
					title: "Publishing workflows",
					action: `${posts.length} connected`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardGrid, {
					rows: posts,
					fallback: [
						{
							title: "Behind the scenes",
							status: "Draft",
							content: "Shape a behind-the-scenes story for your connected channels."
						},
						{
							title: "Productivity tip",
							status: "Scheduled",
							content: "A practical insight ready for review."
						},
						{
							title: "Launch update",
							status: "Review",
							content: "A launch update waiting for final approval."
						}
					],
					onOpen: openPost,
					openLabel: "Open social post"
				})]
			}) : null,
			view === "Analytics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStrip, { metrics: [
				[String(posts.length), "Tracked posts"],
				[String(posts.filter((post) => /scheduled/i.test(value(post, ["status"]))).length), "Scheduled"],
				[String(posts.filter((post) => /publish/i.test(value(post, ["status"]))).length), "Published"],
				["Live", "Provider status"]
			] }) : null,
			selectedPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialPostViewer, {
				post: selectedPost,
				onClose: closePost
			}) : null
		]
	});
}
function OpsSurface({ data, canEdit, onNotice, onReload }) {
	const operations = arraysFrom(data[0]);
	const workflows = arraysFrom(data[1]);
	const [goal, setGoal] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const processes = operations.length ? operations : workflows;
	const active = processes.filter((item) => !/complete|done|archived/i.test(value(item, ["status"]))).length;
	const completed = processes.filter((item) => /complete|done/i.test(value(item, ["status"]))).length;
	const completion = processes.length ? Math.round(completed / processes.length * 100) : 0;
	const hoursSaved = workflows.reduce((sum, item) => sum + numberValue(item, ["hours_saved", "time_saved_hours"], 0), 0);
	const processStatuses = Array.from(processes.reduce((counts, item) => {
		const status = value(item, ["status"], "No status recorded").replace(/[_-]+/g, " ").toLowerCase();
		counts.set(status, (counts.get(status) || 0) + 1);
		return counts;
	}, new Map()), ([status, count]) => ({ status, count }));
	const createWorkflow = async (event) => {
		event.preventDefault();
		if (!goal.trim() || creating) return;
		setCreating(true);
		try {
			await workspaceApiFetch("/api/workflow/create", {
				method: "POST",
				body: JSON.stringify({
					goal: goal.trim(),
					title: goal.trim(),
					source: "workspace_v2"
				})
			});
			setGoal("");
			onNotice("The operating workflow was created and is now available to Aether.");
			await onReload();
		} catch {
			onNotice("The workflow could not be created. Your description is still here so you can retry.");
		} finally {
			setCreating(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationBanner, {
				icon: "ops",
				title: "What Ops does",
				copy: "Ops turns recurring work into visible processes with owners, status and automation. Aether can use those workflows when it plans or recommends a next action.",
				actionHref: aetherPromptHref("Review my current operations and recommend the next process to improve.", "Ops"),
				action: "Review with Aether"
			}),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "workspace-panel compact-action-form",
				onSubmit: createWorkflow,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "New operating workflow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Describe the process or result" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: goal,
						onChange: (event) => setGoal(event.target.value),
						placeholder: "For example: Qualify every new lead and assign a follow-up within one business day."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "workspace-primary-button",
						type: "submit",
						disabled: creating || !goal.trim(),
						children: creating ? "Creating…" : "Create workflow"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStrip, { metrics: [
				[String(active), "Active processes"],
				[`${completion}%`, "Completed"],
				[String(workflows.length), "Connected workflows"],
				[hoursSaved ? `${hoursSaved}h` : "—", "Recorded time saved"]
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-split",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Key processes",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
						rows: processes,
						columns: [
							["title", "Process"],
							["owner", "Owner"],
							["status", "Status"]
						],
						empty: "No operating processes yet. Describe the first workflow above."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Process status",
					children: processes.length ? [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "surface-data-note",
							children: `Current status of ${processes.length} connected ${processes.length === 1 ? "process" : "processes"}.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "ops-status-summary",
							children: processStatuses.map(({ status, count }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: count })]
							}, status))
						})
					] : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-context-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No process activity yet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: canEdit ? "Create your first workflow above to see its status here." : "Process status will appear when a workflow is added to this workspace." })]
					})
				})]
			})
		]
	});
}
function MailSurface({ data }) {
	const stats = asRecord(data[0]);
	const campaigns = arraysFrom(data[1]);
	const [view, setView] = (0, import_react.useState)("Overview");
	const metrics = [
		[String(numberValue(stats, ["contacts", "total_contacts"], 0)), "Contacts"],
		[`${numberValue(stats, ["open_rate"], 0)}%`, "Open rate"],
		[`${numberValue(stats, ["click_rate"], 0)}%`, "Click rate"],
		[`$${numberValue(stats, ["revenue"], 0).toLocaleString()}`, "Revenue"]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationBanner, {
				icon: "mail",
				title: "Mail is synchronized",
				copy: "Campaigns, contacts and performance in this view come from the same email system used by mail.espacios.me. CRM supplies relationship context; Aether can use both to plan follow-ups and campaigns.",
				actionHref: "https://mail.espacios.me/",
				action: "Open Mail workspace",
				external: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceTabs, {
				label: "Mail views",
				tabs: [
					"Overview",
					"Campaigns",
					"Automations",
					"Templates",
					"Analytics"
				],
				active: view,
				onChange: setView
			}),
			view === "Overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStrip, { metrics }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-split",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Segmentation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniList, { items: [
							["All contacts", String(numberValue(stats, ["contacts", "total_contacts"], 0))],
							["Engaged", String(numberValue(stats, ["engaged"], 0))],
							["New subscribers", String(numberValue(stats, ["new_subscribers"], 0))]
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Recent campaigns",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							rows: campaigns,
							columns: [
								["name", "Campaign"],
								["status", "Status"],
								["open_rate", "Opens"]
							],
							empty: "No campaigns have been sent yet."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mail-connection-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: "/email-marketing?view=contacts",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "teams" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Contacts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Manage synchronized audiences" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: "/email-marketing?view=journeys",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "ops" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Automations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Build lifecycle journeys" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: aetherPromptHref("Use my CRM and Mail context to recommend the next campaign and audience.", "Mail"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "aether" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Plan with Aether" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Turn live context into a campaign brief" })] })]
						})
					]
				})
			] }) : null,
			view === "Campaigns" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
					title: "Campaigns",
					action: `${campaigns.length} connected`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					rows: campaigns,
					columns: [
						["name", "Campaign"],
						["status", "Status"],
						["open_rate", "Opens"]
					],
					empty: "No campaigns have been sent yet."
				})]
			}) : null,
			view === "Analytics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricStrip, { metrics }) : null,
			view === "Automations" || view === "Templates" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-tab-empty connected-editor-link",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: view === "Automations" ? "ops" : "documents" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: view }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Create and edit ",
						view.toLowerCase(),
						" in the synchronized Mail workspace. They remain available to CRM and Aether."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "workspace-primary-button",
						href: `/email-marketing?view=${view.toLowerCase()}`,
						children: [
							"Open ",
							view.toLowerCase(),
							" editor"
						]
					})
				]
			}) : null
		]
	});
}
function CrmSurface({ data, canEdit }) {
	const root = asRecord(data);
	const all = arraysFrom(data);
	const stages = [
		"Prospecting",
		"Qualified",
		"Proposal",
		"Won"
	];
	const [query, setQuery] = (0, import_react.useState)("");
	const [stageFilter, setStageFilter] = (0, import_react.useState)("All stages");
	const filtered = all.filter((item) => {
		const haystack = [
			"title",
			"name",
			"contact_name",
			"company",
			"account",
			"email"
		].map((key) => value(item, [key])).join(" ").toLowerCase();
		const stage = value(item, ["stage", "status"], "Prospecting");
		return haystack.includes(query.trim().toLowerCase()) && (stageFilter === "All stages" || stage.toLowerCase().includes(stageFilter.toLowerCase()));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-column",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationBanner, {
				icon: "crm",
				title: "CRM keeps the customer record connected",
				copy: "Contacts, deals and next actions feed Leads, Mail and Aether. Update the relationship once here, then use the same context when planning outreach or follow-up.",
				actionHref: aetherPromptHref("Review my CRM pipeline and identify the most important next actions.", "CRM"),
				action: "Review with Aether"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "crm-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "Search deals",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search deals…"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "crm-filter-select",
					"aria-label": "Filter pipeline stage",
					value: stageFilter,
					onChange: (event) => setStageFilter(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All stages" }), stages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: stage }, stage))]
				}) })]
			}),
			filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "crm-board",
				children: stages.map((stage) => {
					const items = filtered.filter((item) => value(item, ["stage", "status"], "Prospecting").toLowerCase().includes(stage.toLowerCase().split(" ")[0]));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "crm-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: stage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: items.length })] }), items.length ? items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "workspace-panel crm-deal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value(item, ["company", "account"], "Account") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: value(item, [
									"title",
									"name",
									"contact_name"
								], "New opportunity") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: value(item, ["email", "owner"], "Unassigned") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value(item, ["value", "amount"], "—") })
							]
						}, `${value(item, ["id"], String(index))}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "empty-inline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query || stageFilter !== "All stages" ? "No matching deals." : "No deals in this stage." })
						})]
					}, stage);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "workspace-panel surface-context-empty",
				role: "status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: all.length ? "No matching deals" : "No deals yet" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: all.length ? "Try another search or pipeline stage." : canEdit ? "Add your first deal in CRM to start tracking relationships and next actions." : "An owner or editor can add the first deal. It will appear here when it is connected." }),
					all.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "workspace-primary-button",
						type: "button",
						onClick: () => {
							setQuery("");
							setStageFilter("All stages");
						},
						children: "Clear filters"
					}) : canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "workspace-primary-button",
						href: createSurfaceHref("crm"),
						children: "Add deal"
					}) : null
				]
			}),
			Object.keys(root).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "surface-data-note",
				children: "Live workspace pipeline data is connected."
			}) : null
		]
	});
}
function IntegrationBanner({ icon, title, copy, actionHref, action, external = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "integration-banner",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: icon }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: actionHref,
				target: external ? "_blank" : void 0,
				rel: external ? "noreferrer" : void 0,
				children: [action, " →"]
			})
		]
	});
}
function Panel({ title, action, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `workspace-panel ${className}`.trim(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeading, {
			title,
			action
		}), children]
	});
}
function PanelHeading({ title, action, tabs, activeTab, onTabChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "panel-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), tabs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tablist",
			"aria-label": `${title} views`,
			children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-selected": (activeTab || tabs[0]) === tab,
				className: (activeTab || tabs[0]) === tab ? "is-active" : "",
				onClick: () => onTabChange?.(tab),
				role: "tab",
				type: "button",
				children: tab
			}, tab))
		}) : action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "panel-heading-meta",
			children: action
		}) : null]
	});
}
function SurfaceTabs({ label, tabs, active, onChange, className = "surface-tabs" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		role: "tablist",
		"aria-label": label,
		children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-selected": active === tab,
			className: active === tab ? "is-active" : "",
			onClick: () => onChange(tab),
			role: "tab",
			type: "button",
			children: tab
		}, tab))
	});
}
function MetricStrip({ metrics }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "metric-strip",
		children: metrics.map(([metric, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "workspace-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: metric }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Live workspace" })
			]
		}, label))
	});
}
function DataTable({ rows, columns, empty, limit = 10, onOpen, openLabel = "Open item" }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyInline, { text: empty });
	const visibleRows = Number.isFinite(limit) ? rows.slice(0, Math.max(0, limit)) : rows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "data-table",
		role: "table",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "data-table-row data-table-head",
			role: "row",
			children: columns.map(([, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				role: "columnheader",
				children: label
			}, label))
		}), visibleRows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `data-table-row ${onOpen ? "is-openable" : ""}`,
			role: "row",
			children: columns.map(([key, label], columnIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				role: "cell",
				"data-label": label,
				children: columnIndex === 0 ? onOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "data-table-open",
					type: "button",
					onClick: () => onOpen(row),
					"aria-label": `${openLabel}: ${value(row, [
						key,
						"name",
						"title"
					], "Untitled")}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value(row, [
						key,
						"name",
						"title"
					], "Untitled") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						"aria-hidden": "true",
						children: "→"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value(row, [
					key,
					"name",
					"title"
				], "Untitled") }) : value(row, [key], columnIndex === columns.length - 1 ? "Active" : "—")
			}, key))
		}, `${value(row, ["id"], String(index))}`))]
	});
}
function CardGrid({ rows, fallback, empty = "Nothing is connected here yet.", limit = 4, onOpen, openLabel = "Open item" }) {
	const items = rows.length ? rows : fallback;
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyInline, { text: empty });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "content-card-grid",
		children: (Number.isFinite(limit) ? items.slice(0, Math.max(0, limit)) : items).map((item, index) => {
			const title = value(item, [
				"title",
				"name",
				"topic"
			], "Untitled item");
			const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: value(item, ["status", "type"], "Workspace") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value(item, ["created_at", "updated_at"], "Ready when you are") }),
				onOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
					"aria-hidden": "true",
					children: "Open →"
				}) : null
			] });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: onOpen ? "is-openable" : "",
				children: onOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onOpen(item),
					"aria-label": `${openLabel}: ${title}`,
					children: content
				}) : content
			}, `${value(item, ["id", "title"], String(index))}`);
		})
	});
}
function ArtifactViewer({ kind, title, subtitle, content, sources = [], state = "ready", fullHref, onClose, onRetry, onDownload, onPublish, publishState = "idle", publishedReport, onCopyShare, evidence }) {
	const closeRef = (0, import_react.useRef)(null);
	const [downloadState, setDownloadState] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [onClose]);
	const download = async () => {
		setDownloadState("working");
		try {
			await onDownload();
			setDownloadState("idle");
		} catch {
			setDownloadState("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "artifact-viewer-backdrop",
		onMouseDown: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "artifact-viewer",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "artifact-viewer-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [kind, " file"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "artifact-viewer-title",
						children: title
					}),
					subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subtitle }) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: closeRef,
					type: "button",
					onClick: onClose,
					"aria-label": `Close ${kind.toLowerCase()}`,
					children: "×"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "artifact-viewer-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void download(),
							disabled: downloadState === "working",
							children: downloadState === "working" ? "Preparing PDF…" : "Download PDF"
						}),
						kind === "Research" && onPublish ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void onPublish(),
							disabled: publishState === "working",
							children: publishState === "working" ? "Publishing…" : publishedReport ? "Refresh share report" : "Publish share report"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: fullHref,
							children: [
								"Open full ",
								kind.toLowerCase(),
								" tools →"
							]
						}),
						downloadState === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "status",
							children: "The PDF could not be prepared. Use the full view to print or download it."
						}) : null
					]
				}),
				publishedReport ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "artifact-share-strip",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Share report" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: publishedReport.filename }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: publishedReport.shareUrl,
								target: "_blank",
								rel: "noreferrer",
								children: publishedReport.shareUrl
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void onCopyShare?.(),
							children: "Copy link"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: publishedReport.pdfUrl,
							target: "_blank",
							rel: "noreferrer",
							children: "Open PDF"
						})
					]
				}) : null,
				publishState === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "artifact-publish-error",
					role: "status",
					children: "The share version could not be published. Your workspace report remains available."
				}) : null,
				(0, import_jsx_runtime.jsx)(WorkspaceEvidenceNotice, { data: evidence }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "artifact-viewer-body",
					children: [
						state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "artifact-viewer-state",
							"aria-label": "Loading file",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							]
						}) : null,
						state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "artifact-viewer-state is-error",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This saved file could not be loaded." }), onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onRetry,
								children: "Retry"
							}) : null]
						}) : null,
						state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtifactText, { content }), sources.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "artifact-sources",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Sources" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: sources.map((source, index) => {
								const href = value(source, [
									"uri",
									"url",
									"href"
								]);
								const label = value(source, ["title", "name"], href || `Source ${index + 1}`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /^https?:\/\//i.test(href) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href,
									target: "_blank",
									rel: "noreferrer",
									children: label
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }) }, `${href}-${index}`);
							}) })]
						}) : null] }) : null
					]
				})
			]
		})
	});
}
function ArtifactText({ content }) {
	const normaliseProse = (value) => value.replace(/[“”]/g, "").replace(/[‘’]/g, "'").replace(/\s+\/\s+/g, " and ").replace(/\s+\|\s+/g, " — ").replace(/\|{2,}/g, "—").replace(/[ \t]{2,}/g, " ");
	const blocks = String(content || "").trim().split(/\n{2,}/).filter(Boolean);
	if (!blocks.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "artifact-empty",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This file does not contain written content yet." })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "artifact-document",
		children: blocks.map((block, index) => {
			const heading = block.match(/^(#{1,4})\s+([^\n]+)$/);
			if (heading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: normaliseProse(heading[2]) }, index);
			const lines = block.split(/\n/);
			if (lines.length > 1 && lines.every((line) => /^\s*\|.*\|\s*$/.test(line)) && /^\s*\|?(?:\s*:?-+:?\s*\|)+/.test(lines[1])) {
				const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => normaliseProse(cell.trim()));
				const headers = cells(lines[0]);
				const rows = lines.slice(2).map(cells);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "artifact-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((cell, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: cell }, cellIndex)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((cell, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: cell }, cellIndex)) }, rowIndex)) })] })
				}, index);
			}
			if (lines.every((line) => /^\s*[-*]\s*\[[ xX]\]\s+/.test(line))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "artifact-checklist",
				children: lines.map((line, lineIndex) => {
					const complete = /^\s*[-*]\s*\[[xX]\]/.test(line);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: complete ? "is-complete" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							"aria-hidden": "true",
							children: complete ? "✓" : ""
						}), normaliseProse(line.replace(/^\s*[-*]\s*\[[ xX]\]\s+/, ""))]
					}, lineIndex);
				})
			}, index);
			if (lines.every((line) => /^\s*[-*]\s+/.test(line))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: lines.map((line, lineIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: normaliseProse(line.replace(/^\s*[-*]\s+/, "")) }, lineIndex)) }, index);
			if (lines.every((line) => /^\s*\d+[.)]\s+/.test(line))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: lines.map((line, lineIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: normaliseProse(line.replace(/^\s*\d+[.)]\s+/, "")) }, lineIndex)) }, index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: normaliseProse(block.replace(/^>\s?/gm, "")) }, index);
		})
	});
}
function MiniList({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mini-list",
		children: items.map(([title, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meta })] }, title))
	});
}
function EmptyInline({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "empty-inline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: text })
	});
}
function LoadingPanels() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "loading-grid",
		"aria-label": "Loading workspace",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
		]
	});
}
function SignInState({ authenticated }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "workspace-state workspace-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: authenticated ? "This view is not available for your role" : "Your workspace is ready when you are" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: authenticated ? "Ask a workspace owner for access. The API will continue to protect restricted actions." : "Sign in to reconnect your existing account, data, tools and current sessions." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "workspace-primary-button",
				href: authenticated ? "/aether" : "/login?next=/aether",
				children: authenticated ? "Open Aether" : "Sign in"
			})
		]
	});
}
function ErrorState({ onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "workspace-state workspace-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↻" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The workspace service did not respond" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your data is safe. Retry the request or use the classic interface while the provider recovers." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "workspace-primary-button",
				type: "button",
				onClick: () => void onRetry(),
				children: "Try again"
			})
		]
	});
}
function EmptyState({ surface, canEdit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "workspace-state workspace-panel workspace-illustrated-state",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "workspace-state-symbol",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: surface === "account" ? "settings" : surface })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
				"No ",
				surfaceCopy[surface].title.toLowerCase(),
				" items yet"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: canEdit ? "Create the first item and it will stay connected to this workspace." : "There is nothing to review yet. An owner or editor can add the first item." }),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "workspace-primary-button",
				href: createSurfaceHref(surface),
				children: "Create first item"
			}) : null
		] })]
	});
}
function MobileQuickActions({ surface, isOnboarded }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "mobile-quick-actions",
		"aria-label": "Mobile quick actions",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: "/aether",
				className: surface === "aether" ? "is-active" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "aether" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isOnboarded ? "Aether" : "Workspace" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: "/plans",
				className: surface === "plans" ? "is-active" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "plans" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Plans" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: "/research",
				className: surface === "research" ? "is-active" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "research" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Research" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: "/crm",
				className: surface === "crm" ? "is-active" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIcon, { name: "crm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CRM" })]
			})
		]
	});
}
//#endregion
export { WorkspaceApp };
