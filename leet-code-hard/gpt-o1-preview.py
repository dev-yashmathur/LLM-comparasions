class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        n = len(nums)
        # Pad nums with 1 on both sides
        nums_padded = [1] + nums + [1]
        n_padded = n + 2

        # Initialize DP table
        dp = [[0] * n_padded for _ in range(n_padded)]

        # Build up from shorter lengths to longer lengths
        for length in range(1, n + 1):  # length of subarray
            for left in range(1, n - length + 2):  # start of subarray
                right = left + length - 1  # end of subarray
                # Find the best place to burst the last balloon in (left, right)
                for k in range(left, right + 1):
                    # dp[left][right] = max coins from bursting balloons between left and right
                    coins = dp[left][k - 1] + dp[k + 1][right] + nums_padded[left - 1] * nums_padded[k] * nums_padded[right + 1]
                    dp[left][right] = max(dp[left][right], coins)

        return dp[1][n]

