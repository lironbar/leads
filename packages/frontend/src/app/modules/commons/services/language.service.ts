import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

export class LanguageService {

    // currentLang: string;
    defaultLanguage = 'en';
    private currentLangSubject = new BehaviorSubject<string>('');
    public currentLang = this.currentLangSubject.asObservable();

    constructor(
        private translate: TranslateService
    ) {}

    public getCurrentLanguage() {
        return this.currentLang;
    }

    public initTranslations() {

        // this sets the languages options.
        this.translate.addLangs(['en', 'he']);

        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');

        // this.currentLang = JSON.parse(localStorage.getItem('language'));
        let language = JSON.parse(localStorage.getItem('language'));
        if (!language) {
            language = this.defaultLanguage;
            localStorage.setItem('language', JSON.stringify(this.defaultLanguage));
        }
        this.currentLangSubject.next(language);
        this.translate.use(language);
    }

    public useLanguage(lang) {
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(lang);
        localStorage.setItem('language', JSON.stringify(lang));
        this.currentLangSubject.next(lang);
    }
}