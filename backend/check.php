<?php
    include_once 'requests.php';
    
    $method = $_SERVER["REQUEST_METHOD"];
    if(strcmp($method, 'GET') == false) {
        $social = $_GET['social'];
        $username = $_GET['username'];

        $social_checker = array(
            'blex.me' => array(
                'https://blex.me/@'.$username,
                'id=\'error-text\''
            ),
            'brunch.co.kr' => array(
                'https://brunch.co.kr/@'.$username,
                '존재하지 않는 사용자입니다'
            ),
            'buymeacoffee.com' => array(
                'https://www.buymeacoffee.com/'.$username,
                'It returned a 404 error'
            ),
            'facebook.com' => array(
                'https://www.facebook.com/'.$username,
                '페이지를 찾을 수 없음'
            ),
            'github.com' => array(
                'https://github.com/'.$username,
                'Not Found'
            ),
            'instagram.com' => array(
                'https://www.instagram.com/'.$username.'/',
                'Page Not Found'
            ),
            'medium.com' => array(
                'https://medium.com/@'.$username,
                '<div class="df dg ce dh di ch r dj">404</div>'
            ),
            'tistory.com' => array(
                'https://'.$username.'.tistory.com',
                'tit_error  tit_error_type2'
            ),
            'twitter.com' => array(
                'https://api.twitter.com/i/users/username_available.json?username='.$username,
                '사용 가능합니다'
            ),
            'velog.io' => array(
                'https://velog.io/@'.$username,
                'undraw_page_not_found'
            ),
            'youtube.com' => array(
                'https://www.youtube.com/'.$username,
                '404 Not Found'
            )
        );
        
        $index = -1;
        $requests = new Requests();
        foreach ($social_checker as $key => $value) {
            if(strpos($social, $key) !== false) {
                $url =  $value[0];
                $response = $requests->get($url);

                $result = 'N';
                if(strpos($response, $value[1]) !== false) {
                    $result = 'Y';
                }
                echo $result;
                return;
            }
        }
    }
    http_response_code(404);
?>