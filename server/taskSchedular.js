"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = require("node-cron");
var emailService_ts_1 = require("./emailService.ts");
var connection_1 = require("./db/connection");
var moment_timezone_1 = require("moment-timezone");
node_cron_1.default.schedule('* * * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expiredCapsules, _i, expiredCapsules_1, capsule, media, user, userEmail, subject, message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Cron job is running every minute');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                return [4 /*yield*/, (0, connection_1.default)('capsules')
                        .where('time', '<', (0, moment_timezone_1.default)().tz('Pacific/Auckland').format('YYYY-MM-DD HH:mm:ss'))
                        .andWhere('time', '!=', null)];
            case 2:
                expiredCapsules = _a.sent();
                if (!(expiredCapsules.length > 0)) return [3 /*break*/, 10];
                console.log("".concat(expiredCapsules.length, " expired capsules found."));
                _i = 0, expiredCapsules_1 = expiredCapsules;
                _a.label = 3;
            case 3:
                if (!(_i < expiredCapsules_1.length)) return [3 /*break*/, 9];
                capsule = expiredCapsules_1[_i];
                return [4 /*yield*/, (0, connection_1.default)('medias')
                        .where('capsule_id', capsule.id)
                        .select('image_url')];
            case 4:
                media = _a.sent();
                return [4 /*yield*/, (0, connection_1.default)('users').where('id', capsule.user_id).first()];
            case 5:
                user = _a.sent();
                if (!user) return [3 /*break*/, 7];
                userEmail = user.email;
                subject = 'Your Capsule Lock Time Expired';
                message = "Hello ".concat(user.name, ",\n\nYour capsule titled \"").concat(capsule.title, "\" has been unlocked and is now available to view.\n\nDescription: ").concat(capsule.description, "\nTags: ").concat(capsule.tags);
                return [4 /*yield*/, (0, emailService_ts_1.sendEmail)(userEmail, subject, message, media)];
            case 6:
                _a.sent();
                console.log("Email sent to ".concat(userEmail, " for capsule ").concat(capsule.title));
                return [3 /*break*/, 8];
            case 7:
                console.log("User not found for capsule ".concat(capsule.title));
                _a.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 3];
            case 9: return [3 /*break*/, 11];
            case 10:
                console.log('No expired capsules found.');
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _a.sent();
                console.error('Error checking expired capsules:', error_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });
