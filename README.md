# SNSNC

> 나는 baealex라는 닉네임을 사용중이다. 그런데 alex라는 영어 이름이 상당히 흔해서 그런지 이미 선점중인 경우가 많았다. 트위터에선 baealex, 차선책인 bae_alex까지 사용할 수 없어서 진지하게 새로운 닉네임으로 바꿔봐야하나 고민중이다. 그래서 독특한 닉네임이면서 모든 소셜에서 사용할 수 있도록 모든 소셜에 닉네임을 한번에 검색하는 페이지를 만들어 보았다.

<br>

![](https://static.blex.me/images/content/2020/4/18/baealex/14_6WsnVviWEQz7C69IvGGK.jpg)

디자인은 이런 느낌이고 닉네임을 검색하면 (내가 알고있는) 소셜 네트워크 서비스에 이 닉네임이 존재하는지 점검한다. 프론트에서 직접 요청을 보낼 수 없으므로 프론트에서 내 API 서버로 요청을 보내면 거기서 원하는 사이트에 요청을 보내고 그걸 프론트로 돌려준다. `Rust - Rocket`을 사용하고 싶었지만 별도의 서버를 관리하지 않기 위해서 `PHP`를 사용하였다.

`PHP`에서 `Python`의 `Requests`와 같은 작업을 처리할 라이브러리를 찾았는데 기본적으로 `CURL`을 사용할 수 있게 제공하고 있어서 원하는 결과를 얻을 수 있었다. 프론트에선 받아온 결과를 바탕으로 사용할 수 있는지 없는지 판단했다. 다만 월별 1GB의 트레픽을 무료로 사용할 수 있는데 전체 데이터를 전부 넘겨주다보니 짧은 시간동안 상당한 트래픽을 소모되는 걸 체감했다.

1GB의 트레픽이 인바운드를 포함하는지 아니면 순수 아웃바운드인지 명시되어있지 않았으나 우선 아웃바운드라도 줄여 볼 생각으로 백엔드에서 판단해주고 `Y/N`만 보내주도록 바꾸었다. 그랬더니 트래픽 소모가 상당히 줄었다. 😄