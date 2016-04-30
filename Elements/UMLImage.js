define(function(require, exports, module) {
    "use strict";

    var UML = app.getModule("uml/UML");

    require("Graphics");

    function UMLImageView() {
        type.UMLNoteView.apply(this, arguments);
        this.stereotypeDisplay  = UML.SD_ICON;
        this.iconName = "image";
        this.base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAUjklEQVR4Xu1deXhURbY/dW93Op2FLYEgS3ZUEHDGARdcUVBBBHUmQUgy+p4OEBAU9Om8cT5lvvGNo6gIzxBwhlkkBCHOIIyK4gYoigi+UUCQrOzEBEgga3ffW+9UQ0MSerlr35vOvd+Xf9JVp8459auqU3VOnSIQYR8F4MoWT07jeW4I4WxpADRVBEjmCO0tApfIAe0FQGKA0ihKIIqJTyi4gBAXlm0SRXqC4+CESEkNB3CQUlqJ5SptlH6fPLO4igAgucj5UJ7O/e16+f6Bzmh+FMdz1xNKR1JKhnE8idVDKpHSBmxjNxXpduDIVsHd9MWgOf88rEdb4aLZ6QDw6fxbogf26T+a47hxQGEcx5HMcCnLXzsiFUtBoBtEIBsO1RzeNHr+phYj+ZHbdqcAwJo1WVEjah134lScjdPyRMJx8XIFDUd5XC5OUwrrKIhrdia4NmZnl+CyYu7P1ADY+9rkSx2c/VfI5AOE53qbW5XtuUMw/ChS+Bu4hD9nPFpcalbeTQcAHEGksmDKGMLbHiccucOsipPDF6Xi+6KHvpQ+a+UnhODCZaLPNABg1ntFYe69OMU/g1P8cBPpSDNWqCD8W+DF32VMW7XOLEAwHABsxGPHj8ft2XOE53+imbZNTEgQhZ1UJL/NnFX0vtFsGgqA0temXMHbbAs5QsYarQgj2mdLg1twz7t01uq9RrTP2jQEAN8uuD22W1yf3+Pgn4PbON4o4c3QrkCph4j01ZN8zLMjpr/eFG6ewg6A0oKc2208LCOETw23sGZuD88TKqiHTst4ZOXH4eQzbADYsWxaTILQ9BJu5/LDKWBna0v0CIsP1Bx5KlwHSmEBwA+LJ18ZZbe9STj+8s7WIUbwi0fOu8VW15TMR1fv1rt93QFQUTg1jwD3Om7tovUWJpLoi6LYJIL4UGZ+8Zt6yqUbAOgtYKu8P+8VtPBn6ylApNNG2+CVtF6tT5LsEkEPWXUBwOcvTIzvHx+/Gvf14/RguqvRxCXhX2fOVE+58r82Nmotu+YA+H7hfZc4Hc73usqhjtYdEoieINJvmlrrxw97bH21lm1qCoDyZVnJRIz+2GgXrZYKMhMtKtD9Hk/jbVrGIGgGgNLFkzNs9qhP0IGTbCalRRovlApVnEhvS5lZXKGFbJoAgI18Toz+zOp8LbokNA0GAo+r+UYtZgLVAGBrfnR07BZr2g/dcVqWYMtBg6v+JrU2gSoAnLP2t1gGn5ZdK50W8yo2NNTcrGZ3oBgAbJ9flZ2z3trqSe8wPUqyLWJar5Z7lZ4TKAZAxdK8xdYhjx5dKp8mOyxKn1H0uPyaCt3B7HiX42xvKGkwNvNa6P7TSWDrngToG1BCIuLqUNEDnvpqqN/5NjRWbFckn0f0TFFybCx7Bjjr2LFvk3u2zzlioe+kZ8Deo68iAbtKJfepo3B83e9BdMkLDfD6Dlzua+Q6kGQBwOvSFRt3yvXqsc7vP+Vl4KKcXaUfVcnJOv9I8ePyQYBexAPHD42U40qWBQCM3SvACxkz5UrXL/sFa+TLVJr71BE4WvIbmbUABFFclJFf9JjUipIBwCJ57Db+A6mEfeXYmp94qxUDIldvrHztRwWKbALBLYyRGlkkCQB75mfFxfSN2qUkjKtf1vNg79lPifxdvo771GGcBZ6WrQecBcqr95cPG7Xwy+ZQlSUBoLIw9xU0+uaGIubv9+SH/2JZ+0oUh3Wo4IGDyx9SVBu9hy9m5K94KlTlkADwhm7ztm+VRu+mTPt7KB6s34No4MDrDyjSD4s2dre0DL38sZIfghEICgDvNa1leR+oidsPBYBfv7NHkYCRUumPE64IKopSADCigiC+mzGzaIJiAJQvyb0LEy28o0bZFgCCa09PALCW3R7hjkGzVm4MxEXAGYDd1atakrNTraPHAoCxAEBfwY606SuuDnQXMSAAygtzf85z3FtqRj+rawHAWACw1kVBnJQ+s2i9P078AoCt/VVLc/+txS1dCwDGA4DFE6bPWDHC3yzgFwAVr00Zy9ntAdcNObOCBQDjAeC1BVzi6EGzizZ15MYvACoL897XKjmDBQBzACDQjuAiALC0LE67I+je0ZoB5GjAHABgXHg8zYMyZ5WUteXoIgBULMldgCnXntBKRGsGMA8ABCq+kDGj6NcBAcCycY2sdRzWMiGTBQDzAADzG1af4JwDMQ+B28dVuxkAR/9EHP3rtBr9kbgNtBMBRsZVwrCYI5BoP+NVVa07Hr5rGgA7GtLATTHLkYxP74OgjqwIbs9dGY8Uv+cXALj3L8K9f44M/kMWjaQZoIetCXIStkGC3f8VvVpPHBTXXAN1QkxIvfgKhBsAmMPw72nTix68CAAsA2dK34E1eO4fJ5l7CQUjBQBs5E/rszlg5/tUwWaDP/14k+SZwAAA1O/dfSJp/P9uaGU8n18CypbkjLPx/PmpQULfSioSKQAYFV8GY7pLy+W0sW4IbGvIkKSfcAOAMSW63benP7Lqw3YA0CvMO1IAMD1pMyTZT0vq1GOuHjgL3CiprBEAoKK4MC2/aF57ABTmlepxvStSAPD0gHeAl5jk04OG4B+O3GViAAj70vJXDj4PAJZyPT4u6qAkjmUWsgAQXGFGzACMo6amhn5D5v7zmNcGKCvImWyz8brkookUAMhaAtzd4U/VN0kaKkYBALORZWHu4re8ANBr/We0IwUA18WXw9ju30vq1I31V8C2M+mSyhoFAMxm/mrajBVzvQDAoM8v0fV7rSSOZRaKFADYiQi/QkMw0dYQVAM17m44+m8AD1oMUj6jACAI9IuMmSvwlRWM/Klckndar2dWIgUArDN78E0wNXH7+RPAjh3MOn/liavhtEf6DSijAMAet0idvqIHYald7A5HOw+RFORKLRNJAGAys5ngZ7HsKPgo9D63LazxxMMudhR8JkXyyPfpzygAeA1Bd0MqqSiYcjdns/sNF5LaycHKRRoAtNBJWxpGAsAjCOMJBn/MweCPRVoL5qNnASC4Zo0EgECFWQgA5bd+pIDGAoB5AYDBoi8R9AC+hR7An0vpTCVlLACYGABAS0jl0pzNeOlT2qmFAgSEGwBUFODMoSo4c/QguOpOgeDGR0F5HqLiu0NsUj/olpIBtmjpVroCkWVVMXIJwDeMPiXlS/P28IQMkcW1jMLhBEB9VSnUfLcTPC2BL8WytDQ9Bw2GxKFXAYfAMPozEgCYVWQXzgC5xwjhdMvbEg4AsFF/9Kst3pEv9XN06wEDbhwL9lhNwx+kNn++nLEAoMcQAHn1hJBusjmXWEF3AIgiHPrsQ2isPiqRowvFbM4YSLltPNhjjHuI1EgAUEGsY7uAZrkJn+RoWm8AHN+xFeoq9sthqV1ZNhOkjJkAeBaimIaaikYCAO8NNpOKpbkChwhQI0SwunoCoK5sHxz/5kvVrMcPSIX+o0arpqOEgLEAEMVOC4Dm2mo4sAnfXcQlQIuvz/AR0OvyYVqQkkXDcAB0xiXA3dwEBz5cH9Tal9ULrDDenBx48x0Q2+cS2VXVVDAWALgEdDYjkFn8Bz7ZAC0na9To3W9d3hENqbdPBLszVnPagQgaCYCzRmAn2wYe//pzqKvU7zV2Z69ESL51fNgSWxkJAFHEbWD5kpzdPM8HT1SjYjxoaQTWlaPRt1O90RdKnB7pl0LfEdeHKqbJ78YCwHsQ1DmOgptr0OjbrJ3RF6r3GAAYEPT+jATA2aPgTuAM8jQ1QdVHGht9IXqWHRmzpYAtCZI/3JGcqvgBTleVQWvDGbChTRF3yQDoddlQYIdO/j4jASB6nUEmdwfrafSF6lhmDDKjkBmHoT7mfzjy+UfQfLL2oqJ8VBT0u2601xnV8TMUAFRcQCqW5MxGp8jiUAIq/V2tDXAMjb56HY2+UHLF4LYwGbeHbJsY6PPgtvTg5g/AdbouYBnmeGLbTGdiUrsyRgLAGxBSXpgzgef4f4VShNLf1QDgVNleqP5mm9KmNavHpvA+V470S8/d1AiH8EDK1RD62tjZbeYk3GZeWA6MBIA3JOzAkqnplLeVa6atDoSUAiDcRl8o+ftddwt0G5jWrpgb13lmmHoag4eKt60Uk9AHBo5m28yzM4qRABCgOeVsWDh6BLW+Fu4TWgkAmNFX+eE6EFpbQvVL2H5nziLmNGLOI/ax6Z5N+2z6l/slDPkJ9B76U0MBgHkC6lOnFfU03cUQURDg0Kfv+TWm5Cpa6/JR8d0QBHd7RzzrfMUARXsi5da7wJnQ27AZANf/rRkzVt5w9mpYQc4izsbP0VphjJ7cGeDYdjT6MLLHrF9Mn77QWncSBJdLFYsODFFLQXvgxUnDg9JRkyw6GGHfFfGzACjMzcanYFarkihAZTkAOFWKRt//GW/06aEHfzQTBg+H5f/9S0MAgI9K/AKflvmHFwCli+8bYHfEHdJDcKkAaKo5DofQoMJMVnqwYUqazBBc+7cFhgCgsb75kiueLDl+fnOLgSH7MTBkkNaakgIAd3MjVG1cr3xN1ZrpMNJ7+42Xwg4AHGR70/JXeAOBLwBAJzsgFACeXPcdHESjr8XPCVoY+8GwpowAQNuXRi8kiSrIvdNm4zZorYlQAHjgmaVo9Ol2N1VrcTSnZwQAiOAZmzKz+KN2MwBLE5fad2C11hHCoQBwzy81y0qreeeEg2C4AcCCQL5ObE3Kzi7xbmPaZwotzHsDE0XlaSm4BYDg2gw7AKj417QZRf/p46odAPTwC1gAMBcAPB5xXOasIgysOPu1A4A3WfTJ6EO4DPTRahawAGAeAFAqHj9BYpIDJotmrJYX5r3Ac+RJCwBaacBEABCE59Nmrmz3IPFFTu7yRVMH8dE25VdtOsgbagYIj5o7bytaHgW7W1szB81Z3c7z6//JmKW5G/DC6J1aqM0CgDotagUAjAB+Jz1/xd0dufELgPLXcm7j7bx3n6j2swCgToNaAcAtuG8ZNHPVZkkA8D4bV5jzjdpHI1ljFgCMB0CwxyMDBrqVLZtyjw3sa9WxbwFArf60mAHwxbAJ+Ibwu/54Cfx0LM4CFUtzvsZ4wZ+pEcKaAdRoD0AtAKhAv0rNX3Gd7KdjGdtlGvgHLAAYCwDBLYzJeGTlx4G4CBzrfK4G3h1UtSOwAGAcADAH0Pr0/KJJwTgICYD9BZMH27ioXegjUJRRyQKAMQDAkC+36BKvyHi0OGh8XUgAMPbVPCaZ/NByTNNmU6eFLlpbFNxwaPnDiqTH0f8HHP1Ph6osCQA7lk2L6UWbdmHEkLQk+G1aTbz3OYjtPTAUH9bvfjTQ8OMBOPH2M7J1gwEfpQeOHx4+ev6mkHH1kgDAOFB6OHS613AY9ovHZQthVQD4bs0C6F63W7YqAr0ULmsb6K+wkvDxsuoGuHbGIpwFBsgWpCtXYKP/q2XzIDNJXh7DtuFeUvQneQZgxM49Lvk13iIaKoU4K1NV0wjU7oQb5izFFK3hS70ilT8zlvO0NMLnr84ATmyBlETpr5DiIxDf7t1Te43vUUgpsskCACNYtmjyUC7K/hXeI5DE2Y+nW6G+yY2dHwMj/+N5ayYI0Sts5O/4y2/B42qCHrF26B3vkNKPgMe9DR7BdfWls1ZLe93yHFXZAPDaAwW5U3gbVyyFs1aPCAdrL9yfSxoyCtJuyoKYhH6Yq9faHTAdMmu/6cRRqNi0Bn7cd+FiTDKOfodNWgpH3ytgUvqkbRlFAGAE5CSW8M0CcpnryuXljH5BpC9m5K94Som+FAOArsniK09Gr0V74CIfc0dGcHqCo6daoNklKOGxy9VxOnjo38MZLCfFeZ1gBpW1qQmuLJJdoki5igHAONgzPysuOil6M4aQXRWqlxgIas+4vPaA9QXWABv5iXEOaZ1Phe0nSOxojPGTf0ddjQ3Qlv1dr05MiovqvoXwRFJKLWYTnG7GNa9VALeAaYq6zlVAv73OMs/YeQ5icNR3c9olr/nsetcpd8vNV80pUZUxU9UM4JOIXS61RTk/w5dHUq3Rrb8GRIFWultabrxsXskRta1pAgDGBEs1I3LkYwsEarskeH3W+a2t7lsHz32zSouWNAMAY4a9Qh7ntH8kdTnQQoCuRAMNvn2uZtcYLUa+T2+aAsALArQJYhzx76qNJOpKHStFVooG3ymXa4LaNb9jW5oDwLc7cPaNLpayRZQifFcvw7Z6J7jYXDXWfiAd6gIA1tjZcwLHi+hCntfVO1CN/OyQJz2h5TdK9/mh2tYNAL6Gywqn3s8Bt1yq7yAUw13ld3a2j86dB1keHz1l1h0AjHmvA8kRtUqOF1FPoc1Om3n1XMRz/2XTV+3Tm9ewAIAJ8cXc65x9M9P/qFc6Or0VFS76ooe+vG9f7dNyXLpqeAsbAHxMssgiYiOvKwkvUyOo2euyMC50Ck4bNLtoUzh5DTsAmHAsxrCn2PwsZieYh8/WdmmfMIvexdPwBcf3lz83auGXgd+81QkVhgDAJ8u+V7Muc0RHv4IJKcbrJJ+pybK4feoSnwgVuq2nEIYCwCdYaUHO7TzP/Q8aiSP0FNYstNl1Lez8p4Pd2AkXr6YAABOW3UjGIJO7KSHPSnEvh0tBWrbDbumiF28+xuu/F+iunpbtSaFlGgD4mGVAKF8y9RZ8yeyJSFkaWHIGgXpeysxftcUsHe/Tt+kA0Ba1ZQVZmYR3PMxR8iDm1W3/1ooUeBtYhiVkwkjNv3o8nuUd07IYyNZFTZsaAD5ucddg7+luGMvZuWz83z0EuO5mUuL52QuTMAIHa/HJgzV1tpiP22bjMiO/jKdOAYC2yntv9jjH5Zf1uAmzl4xDy2EcPu92uZHKZZE5lNANvChu+CrRvcWXgdNInuS03ekA0FG47xfed0l0lPN6wnPX47N9V3OEDiMcFy9HCVLL4hHtaRHEXbgkbcc3y7e2nGndylKuS61vxnKdHgAdlcqMyL0F9yVHcc4hhIM0IpI04EkKEcRE3GHgK5AkkVDqpBzBGxf03K0L0kpE2oq/40EMrcXfaynP1eLWpIoC/olQSXjXnvRpJZhEEyIqivH/ASV1v5ChfLpmAAAAAElFTkSuQmCC';

        this.autoResize = false;
        this._leftPadding   = 0;
        this._rightPadding  = 0;
        this._topPadding    = 0;
        this._bottomPadding = 0;
        this.defaultHeight = 256;
        this.defaultWidth = 256;
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
    }
    // inherits from UMLNoteView
    UMLImageView.prototype = Object.create(type.UMLNoteView.prototype);
    UMLImageView.prototype.constructor = UMLImageView;

    /*UMLImageView.prototype.size = function (canvas) {
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
    };*/

    UMLImageView.prototype.drawObject = function (canvas) {
        drawImage.call(this, this.iconName, canvas, this.base64Image);
    };

    UMLImageView.prototype.drawIcon = function (canvas, rect) {
    };

    UMLImageView.prototype.setBase64Image = function(base64Image) {
        this.base64Image = base64Image;
    };

    function drawImage(imageName, canvas, base64Image) {
        /*var imagePath = '../style/icons/' + imageName + '.svg';
         imagePath = require.toUrl(imagePath);*/
        var image = new Image();
        image.src = base64Image;
        var sizeWidth = (this.width);
        var sizeHeight= (this.height);
        canvas.context.drawImage(image, this.left, this.top, sizeWidth, sizeHeight);
    }

    //#backbone
    type.UMLImageView	= UMLImageView;
});