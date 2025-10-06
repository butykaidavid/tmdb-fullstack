<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use App\Models\{Movie,Person,Image,Video,Translation,ExternalId,MovieCredit,ChangeLog,TvShow,Season,Episode,Company,Network,Collection,Genre,Keyword,WatchProvider,EntityProvider,ReleaseDate,Certification};

class IngestController extends Controller
{
    public function movie(Request $r){
        $data = $r->all();
        DB::transaction(function() use ($data){
            $m = Movie::updateOrCreate(['tmdb_id'=>$data['tmdb_id']], Arr::only($data,['title','original_title','overview','release_date','popularity','vote_average','vote_count','poster_path','backdrop_path','raw']));
            foreach (($data['translations'] ?? []) as $t) Translation::updateOrCreate(['entity_type'=>'movie','entity_id'=>$m->id,'lang'=>$t['lang']], ['title'=>$t['title']??null,'overview'=>$t['overview']??null,'raw'=>$t['raw']??null]);
            foreach (($data['images'] ?? []) as $i) Image::updateOrCreate(['entity_type'=>'movie','entity_id'=>$m->id,'file_path'=>$i['file_path']], ['type'=>$i['type']??'poster','vote_average'=>$i['vote_average']??0,'vote_count'=>$i['vote_count']??0,'raw'=>$i['raw']??null]);
            foreach (($data['videos'] ?? []) as $v) Video::updateOrCreate(['entity_type'=>'movie','entity_id'=>$m->id,'site'=>$v['site'],'key'=>$v['key']], ['type'=>$v['type']??'Clip','official'=>$v['official']??false,'name'=>$v['name']??'', 'raw'=>$v['raw']??null]);
            foreach (($data['external_ids'] ?? []) as $e) ExternalId::updateOrCreate(['entity_type'=>'movie','entity_id'=>$m->id,'source'=>$e['source']], ['value'=>$e['value']]);
            foreach (($data['credits']['cast'] ?? []) as $c) MovieCredit::updateOrCreate(['movie_id'=>$m->id,'person_id'=>$c['person_id'],'credit_type'=>'cast','character'=>$c['character']??null], ['cast_order'=>$c['order']??null]);
            foreach (($data['credits']['crew'] ?? []) as $c) MovieCredit::updateOrCreate(['movie_id'=>$m->id,'person_id'=>$c['person_id'],'credit_type'=>'crew','job'=>$c['job']??null,'department'=>$c['department']??null], []);
            foreach (($data['release_dates'] ?? []) as $rd) ReleaseDate::updateOrCreate(
                ['movie_id'=>$m->id,'region'=>$rd['region'],'release_date'=>$rd['release_date']],
                ['certification'=>$rd['certification'] ?? null,'type'=>$rd['type'] ?? null]
            );
        });
        return response()->json(['status'=>'ok']);
    }

    public function person(Request $r){
        $data = $r->all();
        DB::transaction(function() use ($data){
            $p = Person::updateOrCreate(['tmdb_id'=>$data['tmdb_id']], Arr::only($data,['name','birthday','deathday','place_of_birth','biography','profile_path','popularity','raw']));
            foreach (($data['images'] ?? []) as $i) Image::updateOrCreate(['entity_type'=>'person','entity_id'=>$p->id,'file_path'=>$i['file_path']], ['type'=>'profile','vote_average'=>$i['vote_average']??0,'vote_count'=>$i['vote_count']??0,'raw'=>$i['raw']??null]);
            foreach (($data['external_ids'] ?? []) as $e) ExternalId::updateOrCreate(['entity_type'=>'person','entity_id'=>$p->id,'source'=>$e['source']], ['value'=>$e['value']]);
        });
        return response()->json(['status'=>'ok']);
    }

    public function tv(Request $r){
        $data = $r->all();
        DB::transaction(function() use ($data){
            $tv = TvShow::updateOrCreate(['tmdb_id'=>$data['tmdb_id']], Arr::only($data,['name','original_name','overview','first_air_date','last_air_date','status','number_of_seasons','number_of_episodes','popularity','vote_average','vote_count','poster_path','backdrop_path','raw']));
            foreach (($data['translations'] ?? []) as $t) Translation::updateOrCreate(['entity_type'=>'tv','entity_id'=>$tv->id,'lang'=>$t['lang']], ['title'=>$t['title']??null,'overview'=>$t['overview']??null,'raw'=>$t['raw']??null]);
            foreach (($data['images'] ?? []) as $i) Image::updateOrCreate(['entity_type'=>'tv','entity_id'=>$tv->id,'file_path'=>$i['file_path']], ['type'=>$i['type']??'poster','vote_average'=>$i['vote_average']??0,'vote_count'=>$i['vote_count']??0,'raw'=>$i['raw']??null]);
            foreach (($data['videos'] ?? []) as $v) Video::updateOrCreate(['entity_type'=>'tv','entity_id'=>$tv->id,'site'=>$v['site'],'key'=>$v['key']], ['type'=>$v['type']??'Clip','official'=>$v['official']??false,'name'=>$v['name']??'', 'raw'=>$v['raw']??null]);
        });
        return response()->json(['status'=>'ok']);
    }

    public function season(Request $r){
        $data = $r->all();
        DB::transaction(function() use ($data){
            $s = Season::updateOrCreate(['tv_show_id'=>$data['tv_show_id'],'season_number'=>$data['season_number']], Arr::only($data,['name','overview','air_date','poster_path','raw']));
            foreach (($data['translations'] ?? []) as $t) Translation::updateOrCreate(['entity_type'=>'season','entity_id'=>$s->id,'lang'=>$t['lang']], ['title'=>$t['title']??null,'overview'=>$t['overview']??null,'raw'=>$t['raw']??null]);
            foreach (($data['images'] ?? []) as $i) Image::updateOrCreate(['entity_type'=>'season','entity_id'=>$s->id,'file_path'=>$i['file_path']], ['type'=>'poster','vote_average'=>$i['vote_average']??0,'vote_count'=>$i['vote_count']??0,'raw'=>$i['raw']??null]);
        });
        return response()->json(['status'=>'ok']);
    }

    public function episode(Request $r){
        $data = $r->all();
        DB::transaction(function() use ($data){
            $e = Episode::updateOrCreate(['season_id'=>$data['season_id'],'episode_number'=>$data['episode_number']], Arr::only($data,['name','overview','air_date','vote_average','vote_count','still_path','raw']));
            foreach (($data['translations'] ?? []) as $t) Translation::updateOrCreate(['entity_type'=>'episode','entity_id'=>$e->id,'lang'=>$t['lang']], ['title'=>$t['title']??null,'overview'=>$t['overview']??null,'raw'=>$t['raw']??null]);
            foreach (($data['images'] ?? []) as $i) Image::updateOrCreate(['entity_type'=>'episode','entity_id'=>$e->id,'file_path'=>$i['file_path']], ['type'=>'still','vote_average'=>$i['vote_average']??0,'vote_count'=>$i['vote_count']??0,'raw'=>$i['raw']??null]);
        });
        return response()->json(['status'=>'ok']);
    }

    public function company(Request $r){ $d=$r->all(); Company::updateOrCreate(['tmdb_id'=>$d['tmdb_id']], Arr::only($d,['name','origin_country','logo_path','raw'])); return response()->json(['status'=>'ok']); }
    public function network(Request $r){ $d=$r->all(); Network::updateOrCreate(['tmdb_id'=>$d['tmdb_id']], Arr::only($d,['name','origin_country','logo_path','raw'])); return response()->json(['status'=>'ok']); }
    public function collection(Request $r){ $d=$r->all(); Collection::updateOrCreate(['tmdb_id'=>$d['tmdb_id']], Arr::only($d,['name','poster_path','backdrop_path','raw'])); return response()->json(['status'=>'ok']); }
    public function genre(Request $r){ $d=$r->all(); Genre::updateOrCreate(['tmdb_id'=>$d['tmdb_id'], 'media_type'=>$d['media_type']], ['name'=>$d['name']]); return response()->json(['status'=>'ok']); }
    public function keyword(Request $r){ $d=$r->all(); Keyword::updateOrCreate(['tmdb_id'=>$d['tmdb_id']], ['name'=>$d['name']]); return response()->json(['status'=>'ok']); }
    public function providers(Request $r){
        $d=$r->all();
        if (isset($d['provider'])) {
            WatchProvider::updateOrCreate(
                ['tmdb_id'=>$d['provider']['tmdb_id']],
                ['provider_name'=>$d['provider']['provider_name'] ?? '', 'logo_path'=>$d['provider']['logo_path'] ?? null]
            );
        }
        foreach (($d['entity_providers'] ?? []) as $ep) {
            $wp = WatchProvider::firstOrCreate(['tmdb_id'=>$ep['provider_tmdb_id']], ['provider_name'=>'']);
            EntityProvider::updateOrCreate(['entity_type'=>$ep['entity_type'],'entity_id'=>$ep['entity_id'],'watch_provider_id'=>$wp->id,'region'=>$ep['region'],'offer_type'=>$ep['offer_type']], []);
        }
        return response()->json(['status'=>'ok']);
    }
    public function releaseDates(Request $r){ $d=$r->all(); ReleaseDate::updateOrCreate(['movie_id'=>$d['movie_id'],'region'=>$d['region'],'release_date'=>$d['release_date']], ['certification'=>$d['certification']??null,'type'=>$d['type']??null]); return response()->json(['status'=>'ok']); }
    public function certifications(Request $r){ $d=$r->all(); Certification::updateOrCreate(['media_type'=>$d['media_type'],'country'=>$d['country'],'cert'=>$d['cert']], ['meaning'=>$d['meaning']??null,'order'=>$d['order']??0]); return response()->json(['status'=>'ok']); }
}
