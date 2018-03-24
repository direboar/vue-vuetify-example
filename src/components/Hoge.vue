<template>
  <div>
    <v-container fluid grid-list-md>
      <v-card>
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs3>
                <v-card height="120">
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-content>キャラクター名:</v-list-tile-content>
                      <v-list-tile-content class="align-end">みのくば</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
              <v-flex xs9>
                <v-card height="120">
                  <v-layout row wrap>
                    <v-flex xs4>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>クラス＆レベル:</v-list-tile-content>
                          <v-list-tile-content class="align-end">ファイター１</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                        <v-list-tile>
                          <v-list-tile-content>種族:</v-list-tile-content>
                          <v-list-tile-content class="align-end">ヒューマン</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs4>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>背景:</v-list-tile-content>
                          <v-list-tile-content class="align-end">隠者</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                        <v-list-tile>
                          <v-list-tile-content>属性</v-list-tile-content>
                          <v-list-tile-content class="align-end">中立にして善</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs4>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>プレイヤー名</v-list-tile-content>
                          <v-list-tile-content class="align-end">みのくば</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                        <v-list-tile>
                          <v-list-tile-content>経験点(XP)</v-list-tile-content>
                          <v-list-tile-content class="align-end">1000</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <v-card>
              <v-card-title class="subheading">能力値</v-card-title>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>種類</v-list-tile-content>
                  <v-list-tile-content>値</v-list-tile-content>
                  <v-list-tile-content>修正値</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>筋力</v-list-tile-content>
                  <v-list-tile-content>１８</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>筋力</v-list-tile-content>
                  <v-list-tile-content>１８</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>筋力</v-list-tile-content>
                  <v-list-tile-content>１８</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>筋力</v-list-tile-content>
                  <v-list-tile-content>１８</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>筋力</v-list-tile-content>
                  <v-list-tile-content>１８</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>筋力</v-list-tile-content>
                  <v-list-tile-content>１８</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-divider/>
              </v-list>
            </v-card>
            <v-card>
              <v-card-title class="subheading">技能</v-card-title>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>威圧</v-list-tile-content>
                  <v-list-tile-content>（＋３）</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs9>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card hover>
                  <v-layout row wrap>
                    <v-flex xs3>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>AC</v-list-tile-content>
                          <v-list-tile-content class="align-end">18</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs5>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>イニシアチブ</v-list-tile-content>
                          <v-list-tile-content class="align-end">18</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs4>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>移動速度</v-list-tile-content>
                          <v-list-tile-content class="align-end">18</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs12>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>最大HP</v-list-tile-content>
                          <v-list-tile-content class="align-end">18</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs12>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>一時HP</v-list-tile-content>
                          <v-list-tile-content class="align-end">18</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs6>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>受動知覚</v-list-tile-content>
                          <v-list-tile-content class="align-end">ｘｘｘ</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs6>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>受動看破</v-list-tile-content>
                          <v-list-tile-content class="align-end">ｘｘｘ</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs6>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>ヒットダイス</v-list-tile-content>
                          <v-list-tile-content class="align-end">4D8</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs6>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>死亡セーブ</v-list-tile-content>
                          <v-list-tile-content class="align-end"></v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs12>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>インスピレーション</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                    <v-flex xs12>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>習熟ボーナス</v-list-tile-content>
                          <v-list-tile-content class="align-end">＋３</v-list-tile-content>
                        </v-list-tile>
                        <v-divider/>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-card>

                <v-card>
                  <v-card-title class="subheading">セービングスロー</v-card-title>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content class="align-end">（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content class="align-end">（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content class="align-end">（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content class="align-end">（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content class="align-end">（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content class="align-end">（＋３）</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
                <v-card>
                  <v-card-title class="subheading">攻撃と呪文</v-card-title>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content>種類</v-list-tile-content>
                      <v-list-tile-content>値</v-list-tile-content>
                      <v-list-tile-content>修正値</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content>１８</v-list-tile-content>
                      <v-list-tile-content>（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-divider/>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content>１８</v-list-tile-content>
                      <v-list-tile-content>（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content>１８</v-list-tile-content>
                      <v-list-tile-content>（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content>１８</v-list-tile-content>
                      <v-list-tile-content>（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content>１８</v-list-tile-content>
                      <v-list-tile-content>（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>筋力</v-list-tile-content>
                      <v-list-tile-content>１８</v-list-tile-content>
                      <v-list-tile-content>（＋３）</v-list-tile-content>
                    </v-list-tile>
                    <v-divider/>
                  </v-list>
                </v-card>
                <!-- </v-flex>
                <v-flex xs12>
                </v-flex>
                <v-flex xs12>
                  受動知覚
                </v-flex>
                <v-flex xs12>
                  その他の習熟と言語
                </v-flex> -->
                <!-- </v-layout> -->
              </v-flex>
              <v-flex xs6>
                <!-- <v-layout row wrap>
                <v-flex xs12> -->
                <v-card-title class="subheading">装備</v-card-title>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>装備名</v-list-tile-content>
                    <v-list-tile-content>数</v-list-tile-content>
                    <v-list-tile-content>重量</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>ランタン</v-list-tile-content>
                    <v-list-tile-content>1</v-list-tile-content>
                    <v-list-tile-content>10pd</v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <!-- </v-flex>
              </v-layout> -->
              </v-flex>
              <!-- <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs12>
                  人格的特徴
                </v-flex>
                <v-flex xs12>
                  尊ぶもの
                </v-flex>
                <v-flex xs12>
                  かかわり深いもの
                </v-flex>
                <v-flex xs12>
                  弱み
                </v-flex>
                <v-flex xs12>
                  特徴・メモ欄
                </v-flex>
              </v-layout>
            </v-flex> -->
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<style>

</style>

<script>
import Ability from "@/model/ability";
import AbilityType from "@/model/abilitytype";

export default {
  data() {
    return {
      totalItems: 1, //ソート禁止
      headers: [
        {
          text: "種類",
          sortable: false,
          class: ""
        },
        {
          text: "値",
          sortable: false,
          class: ""
        },
        {
          text: "修正値",
          sortable: false,
          class: ""
        }
      ],

      //入力業

      items: [
        {
          type: "筋力",
          value: 16,
          modifier: 3
        },
        {
          type: "筋力",
          value: 16,
          modifier: 3
        },
        {
          type: "筋力",
          value: 16,
          modifier: 3
        },
        {
          type: "筋力",
          value: 16,
          modifier: 3
        },
        {
          type: "筋力",
          value: 16,
          modifier: 3
        },
        {
          type: "筋力",
          value: 16,
          modifier: 3
        }
      ],

      pointby: true, //ポイントバイで作成するかどうか
      abilityselectlist: [8, 9, 10, 11, 12, 13, 14, 15], //ポイントバイで購入できる能力値の範囲
      racialmodifierlist: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //種族ボーナス等の追加修正値の選択範囲

      //アラート表示用
      showErrorAlert: false,
      errorAlertMessage: "能力値ポイントを27ポイント以上使用しています。"
    };
  },

  computed: {
    //画面に表示する能力値ポイント。

    displayAbilityPoint() {
      return this.pointby === true ? this.abilitypoint : "-";
    },

    hasPointByError() {
      let current = this._calcuratePoint();

      if (this.pointby && current > 27) {
        return true;
      } else {
        return false;
      }
    },

    abilitypoint() {
      return 27 - this._calcuratePoint();
    },

    //能力値編集コンテナの最大の高さ（スクロールバー表示のため）

    containerHeigth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "max-height: 480px";
        case "sm":
          return "max-height: 480px";
        case "md":
          return "max-height: 640px";
        case "lg":
          return "max-height: 640px";
        case "xl":
          return "max-height: 640px";
      }
    }
  },

  methods: {
    //能力値ポイントを使って能力値を変更する

    pointByAbility(item) {
      if (this.pointby) {
        let next = this._calcuratePoint();
        // //能力値と能力値ポイントを更新する。
        item.ability.value = item.assignment + item.racialmodifier;
        this.abilitypoint = 27 - next;
      } else {
        //ポイントバイではない場合は、単純に更新する。
        item.ability.value = item.assignment + item.racialmodifier;
      }
    },

    //種族ボーナス等の追加修正を反映する。

    updateRacialModifer(item) {
      //チェック不要なので単純に更新する。
      item.ability.value = item.assignment + item.racialmodifier;
    },

    _calcuratePoint() {
      let total = 0;
      this.items.forEach(item => {
        total += Ability.calcPonit(item.assignment);
      });
      return total;
    },

    _initView() {
      this.showErrorAlert = false;
    }
  }
};
</script>
