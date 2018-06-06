import { User } from "../registration-login/_models";

// user's role
export const NONE_ROLE: number = 0;
export const FREE_ROLE: number = 1;
export const GOLD_ROLE: number = 2;
export const DIAMOND_ROLE: number = 3;
export const SUPERVIP_ROLE: number = 4;
export const ADMIN_ROLE: number = 5;
export const ROOT_ROLE: number = 10;

// pattern
export const UNAME_PATTERN = "^[a-zA-Z0-9_-]{8,15}$";
export const PWD_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
export const MOBNUM_PATTERN = "^((\\+91-?)|0)?[0-9]{10}$";
export const EMAIL_PATTERN = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$";

// local storage keys
export const STORAGE_ACCOUNT: string = 'current-user';

// common http root api
export const BACKEND_API_ROOT_URL: string = 
                                            'https://coinserver.evommo.com';
                                            // 'http://localhost:8080';

export const BACKEND_API_PATH: string = '/api';
export const BACKEND_SOCKET_PATH: string = '/socket';

export const BACKEND_API_EVO_PATH: string = '/api/evo';
export const BACKEND_API_BINANCE_PATH: string = '/api/binance';
export const BACKEND_API_COINMARKETCAP_PATH: string = '/api/coinmarketcap';

export const BACKEND_API_EVO_USERS_PATH: string = '/api/evo/users';
export const BACKEND_API_EVO_DOMINANCE_PATH: string = "/api/evo/dominance";
export const BACKEND_API_EVO_AUTHENTICATE_PATH: string = "/api/evo/authenticate";
export const BACKEND_API_EVO_EMAIL_PATH: string = "/api/evo/simpleemail";

export const BACKEND_API_EVO_PAYMENTS_PATH: string = '/api/evo/payments';

export const BACKEND_API_BINANCE_TICKERPRICE_PATH: string = '/api/v3/ticker/price';
export const BACKEND_API_BINANCE_SERVERTIME_PATH: string = '/api/v1/time';
export const BACKEND_API_BINANCE_CANDLESTICK_PATH: string = '/api/v1/klines';

// common exchange url
export const BINANCE_URL: string = "https://www.binance.com";
export const BINANCE_TRADE_DETAIL_URL: string = "https://www.binance.com/tradeDetail.html?symbol=";

// messenger
export const EXPIRED_ACCOUNT_HEAD_MESSENGER: string = "Thông báo hết hạn tài khoản";
export const EXPIRED_ACCOUNT_CONTENT_MESSENGER: string = "Tài khoản của bạn đã hết hạn. Để tiếp tục sử dụng, vui lòng thực hiện thanh toán. Xin cảm ơn!";

export const PAYMENT_PENDING_ACCOUNT_HEAD_MESSENGER: string = "Thông báo chờ xác nhận thanh toán";
export const PAYMENT_PENDING_ACCOUNT_CONTENT_MESSENGER: string = "Chúng tôi đang xác nhận việc thanh toán của bạn. Vui lòng chờ trong vòng 24h kể từ lúc bạn thực hiện thanh toán. Chúng tôi sẽ thông báo kết quả qua email của bạn. Xin cảm ơn!";

export const UPGRADE_ACCOUNT_HEAD_MESSENGER: string = "Thông báo nâng cấp tài khoản";
export const UPGRADE_ACCOUNT_CONTENT_MESSENGER: string = "Bạn cần nâng cấp để sử dụng tính năng này. Xin cảm ơn!";

// package name
export const FREE_PACKAGE: string = "free";
export const FREE_PACKAGE_DETAIL: string = "Gói FREE";
export const FREE_PACKAGE_COLOR: string = "green";
export const FREE_PACKAGE_MONEY: string = "0";
export const FREE_PACKAGE_BITCOIN: string = "0";

export const GOLD_PACKAGE: string = "gold";
export const GOLD_PACKAGE_DETAIL: string = "Gói VÀNG";
export const GOLD_PACKAGE_COLOR: string = "gold";
export const GOLD_PACKAGE_MONEY: string = "490.000";
export const GOLD_PACKAGE_BITCOIN: string = "0.003";

export const DIAMOND_PACKAGE: string = "diamond";
export const DIAMOND_PACKAGE_DETAIL: string = "Gói KIM CƯƠNG";
export const DIAMOND_PACKAGE_COLOR: string = "plum";
export const DIAMOND_PACKAGE_MONEY: string = "1.990.000";
export const DIAMOND_PACKAGE_BITCOIN: string = "0.012";

export const SUPERVIP_PACKAGE: string = "supervip";
export const SUPERVIP_PACKAGE_DETAIL: string = "Gói SUPER VIP";
export const SUPERVIP_PACKAGE_COLOR: string = "blueviolet";
export const SUPERVIP_PACKAGE_MONEY: string = "2.990.000";
export const SUPERVIP_PACKAGE_BITCOIN: string = "0.018";

// package property list
export const BOLLINGER_BAND_PACKAGE_LIST_HEADER: string = "Bollinger Bands";
export const BOLLINGER_BAND_PACKAGE_LIST_CONTENT: string = '(Xem cách sử dụng tại <a href="#">đây</a>)';

export const REAL_CASH_FLOW_PACKAGE_LIST_HEADER: string = "Real Cash Flow";
export const REAL_CASH_FLOW_PACKAGE_LIST_CONTENT: string = '(Xem cách sử dụng tại <a href="#">đây</a>)';

export const TELEGRAM_PACKAGE_LIST_HEADER: string = "Kênh Telegram bao gồm:";
export const TELEGRAM_PACKAGE_LIST_CONTENT: string = "Báo kèo siêu nhanh - chất (Tối thiểu 1 kèo/ngày, kèo ngắn - trung - dài hạn); Kênh cung cấp thông tin đặc biệt (Coin list sàn, Test ví, Airdrop, Hardfork, hội thảo ...)";

export const CLASS_PACKAGE_LIST_HEADER: string = "";
export const CLASS_PACKAGE_LIST_CONTENT: string = "Tham gia học class offline hoặc online về trade coin";

export const OFFICE_PACKAGE_LIST_HEADER: string = "";
export const OFFICE_PACKAGE_LIST_CONTENT: string = "Tham gia offline cùng trade coin, chia sẻ kiến thức, kinh nghiệm cao cấp tại văn phòng";

// class
export class Utilities {
    
    public static isRoot(user: User): boolean {
        if (user.role >= ROOT_ROLE)
            return true;
        return false;
    }
    
    public static isAdmin(user: User): boolean {
        if (user.role >= ADMIN_ROLE)
            return true;
        return false;
    }
    
    public static isSupervip(user: User): boolean {
        if (user.role >= SUPERVIP_ROLE)
            return true;
        return false;
    }

    public static isDiamond(user: User): boolean {
        if (user.role >= DIAMOND_ROLE)
            return true;
        return false;
    }
    
    public static isGold(user: User): boolean {
        if (user.role >= GOLD_ROLE)
            return true;
        return false;
    }

    public static isFree(user: User): boolean {
        if (user.role >= FREE_ROLE)
            return true;
        return false;
    }
    
    public static isNone(user: User): boolean {
        if (user.role >= NONE_ROLE)
            return true;
        return false;
    }

    public static getPackageName(role: number): string {
        if (role === FREE_ROLE) {
            return FREE_PACKAGE;
        }
        if (role === GOLD_ROLE) {
            return GOLD_PACKAGE;
        }
        if (role === DIAMOND_ROLE) {
            return DIAMOND_PACKAGE;
        }
        if (role === SUPERVIP_ROLE) {
            return SUPERVIP_PACKAGE;
        }
        return '';
    }

    public static getRole(packageName: string) : number {
        if (packageName === FREE_PACKAGE) {
            return FREE_ROLE;
        }
        if (packageName === GOLD_PACKAGE) {
            return GOLD_ROLE;
        }
        if (packageName === DIAMOND_PACKAGE) {
            return DIAMOND_ROLE;
        }
        if (packageName === SUPERVIP_PACKAGE) {
            return SUPERVIP_ROLE;
        }
        return NONE_ROLE;
    }

    public static setUser(model: any) : User {
        let user: User = new User();
        user.id = model.id;
        user.username = model.username;
        user.fullName = model.fullName;
        user.email = model.email;
        user.phone = model.phone;
        user.role = model.role;
        user.isExpired = model.isExpired;
        user.createdTimestamp = model.createdTimestamp;
        user.isFreeTrial = model.isFreeTrial;
        user.isPaymentPending = model.isPaymentPending;

        return user;
    }
}