$(document).ready(function() {
    var LAT = function() {
        window.LAT = this;
        $LAT = this;
        this.apiBase = 'http://ds.tribune.com/v1';
        this.sections = [];
        this.articles = []
        this.init = function() {
            this.bindAjaxLoad();
			this.loadSections();
        }
        this.updateSections = function(sections) {
            $LAT.sections = sections;
            var el = $('#section-list ul');
            el.html('');
            $.each($LAT.sections, function(i,v ) {
                el.append('<li><a onclick="$LAT.loadArticlesForSection('+ v.Id+')" href="javascript:void(0);">'+ v.Name +'</a></li>');
            });
            $LAT.showArticlesForDefaultSection();
        };
        this.showArticles = function(articles) {
            $LAT.hideArticle();
            var el = $('section.articles');
            el.html('');
            $LAT.articles = articles.Items;
            $.each($LAT.articles , function(i,v ) {

                el.append('<article><h4><a style="background:url('+v.MetaData[0]['Value']+');background-size:cover;background-position:center;padding-top:40px;text-decoration:none;text-transform:capitalize;font-size:2.2rem;padding: 20px;text-align:center;background-repeat:none;color:#fff;text-shadow: 1px 1px 4px #888888;height: 450px;width:100%;display:block;" onclick="$LAT.loadArticle(\''+v['Id']+'\')" href="javascript:void(0);">'+ v['Title']+'</a></h4></article>');
            });
        };
        this.showArticle = function(article) {
            var el = $('section.article-body');
            el.html('' +
                '<h1>'+article['Title']+'</h1>' +
                '<div class="content"><div 	style="background:url('+article.MetaData[0]['Value']+');" class="thumb img-thumbnail"></div>' + article["MetaData"][1]["Value"]+'<div class="clear"></div></div>');
            $('section.article-body').slideDown();
            $(window).scrollTop(0);
        };
        this.hideArticle = function() {
            $('section.article-body').slideUp();
        };
        this.showArticlesForDefaultSection = function() {
            $LAT.loadArticlesForSection($LAT.sections[0]['Id']);
        };
        this.loadArticlesForSection = function(sectionId) {
            $.ajax({
                url: 'proxy.php',
                data: {url: this.apiBase + "/content/?count=25&index=0&market_id=1&type_filter_layout=true&include_sourcetype_in_layout=false&ensure_description=true&content_profile=2&section_id="+sectionId+"&callback=__jqjsp"},
                success: function( articles) {$LAT.showArticles(articles);}
            })
        };
        this.loadSections = function() {
            $.ajax({
                url: 'proxy.php',
                data: {url: this.apiBase + "/sections/?market_id=1&children=true&content_profile=2&hidden=false&include_section_img=true&include_layout=false&include_related=false&include_child=false&exclude_dupes=true&auth_app_id=94c85eed-f6fc-45b7-b52a-1eeb99903907&auth_date=03%2F30%2F2014&auth_hash_key=826ef3bb1128e09ddb85bf97a2767363a46735ba&callback=__jqjsp"},
                success: function( sections ) {$LAT.updateSections(sections);}
            });
        };
        this.loadArticle = function(articleId) {
            $.ajax({
                url: 'proxy.php',
                data: {url: this.apiBase + "/content/"+articleId+"/?market_id=1&callback=__jqjsp"},
                success: function( article ) {$LAT.showArticle(article);}
            });
        };
        this.bindAjaxLoad = function() {
            $( document ).ajaxStart(function() {
                $('.navbar-brand').addClass('pulse');
            });
            $( document ).ajaxStop(function() {
                $('.navbar-brand').removeClass('pulse');
            });
        };
        this.init();
    }
    LAT();
});
